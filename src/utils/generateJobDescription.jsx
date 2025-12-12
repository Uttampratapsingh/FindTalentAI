
// // Helper function to remove <think> ... </think> tags
// export function removeThinkTags(text) {
//   return text.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
// }

export async function generateJobDescription(prompt) {
  try {
    const res = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCzOlCNZVcSrhI',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Based on this job requirements: "${prompt}"

Please generate a detailed job description with the following sections in plain text format:

JOB_TITLE: [Write just the job title here]
LOCATION: [Write the work location]
TYPE: [Write employment type like Full-Time, Part-Time, Contract]
EXPERIENCE: [Write experience level required]
COMPANY_DESCRIPTION: [Write a brief company and role description in plain text without any special characters or formatting]
RESPONSIBILITIES: [List 3-5 key responsibilities, each on a new line starting with a dash]
SKILLS: [List required skills separated by commas]
SEARCH_TAGS: [List relevant search tags separated by commas]

Use only plain text, no brackets, no curly braces, no JSON formatting. Keep descriptions natural and readable.`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await res.json();
    console.log('API Response:', data);

    const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    console.log('Clean AI Response:', raw);

    // Parse sections
    const lines = raw.split('\n').map(line => line.trim()).filter(Boolean);

    let title = 'Generated Position';
    let location = 'Remote';
    let type = 'Full-Time';
    let experience = 'Mid-level';
    let description = '';
    let responsibilities = [];
    let skills = [];
    let searchTags = [];

    let section = '';

    for (const line of lines) {
      if (line.startsWith('JOB_TITLE:')) {
        title = line.replace('JOB_TITLE:', '').trim();
      } else if (line.startsWith('LOCATION:')) {
        location = line.replace('LOCATION:', '').trim();
      } else if (line.startsWith('TYPE:')) {
        type = line.replace('TYPE:', '').trim();
      } else if (line.startsWith('EXPERIENCE:')) {
        experience = line.replace('EXPERIENCE:', '').trim();
      } else if (line.startsWith('COMPANY_DESCRIPTION:')) {
        description = line.replace('COMPANY_DESCRIPTION:', '').trim();
        section = 'description';
      } else if (line.startsWith('RESPONSIBILITIES:')) {
        section = 'responsibilities';
      } else if (line.startsWith('SKILLS:')) {
        skills = line
          .replace('SKILLS:', '')
          .split(',')
          .map(s => s.trim())
          .filter(Boolean);
        section = '';
      } else if (line.startsWith('SEARCH_TAGS:')) {
        searchTags = line
          .replace('SEARCH_TAGS:', '')
          .split(',')
          .map(t => t.trim())
          .filter(Boolean);
        section = '';
      } else if (section === 'description') {
        description += ' ' + line;
      } else if (section === 'responsibilities' && line.startsWith('-')) {
        responsibilities.push(line.replace('-', '').trim());
      }
    }

    // Fallback defaults
    if (!responsibilities.length) {
      responsibilities = [
        'Work on exciting projects and deliver high-quality results',
        'Collaborate with team members and stakeholders',
        'Contribute to product development and innovation',
      ];
    }
    if (!skills.length) {
      skills = ['Communication', 'Problem Solving', 'Team Collaboration'];
    }
    if (!searchTags.length) {
      searchTags = ['Generated', 'AI'];
    }

    const jobDescription = {
      title,
      location,
      type,
      experience,
      description,
      responsibilities,
      skills,
      searchTags,
    };

    console.log('Parsed job description:', jobDescription);
    return jobDescription;
  } catch (err) {
    console.error('API Error:', err);
    throw new Error('Failed to generate job description');
  }
}
