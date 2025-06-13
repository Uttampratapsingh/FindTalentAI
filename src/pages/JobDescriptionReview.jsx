import { useState } from "react";

import {Eye, EyeOff,X,Sparkles} from "lucide-react";
import {FiArrowLeft} from "react-icons/fi";
import { ResizableHandle,ResizablePanel,ResizablePanelGroup } from '../components/ui/Resizable';

import { generateJobDescription} from '../utils/generateJobDescription';

const JobDescriptionReview = ({ jobDescription, onReview }) => {
    const [editableDescription, setEditableDescription] = useState(jobDescription);
    const [newSkill, setNewSkill] = useState('');
    const [newSearchTag, setNewSearchTag] = useState('');
    const [positions, setPositions] = useState(8);
    const [experienceMin, setExperienceMin] = useState(2);
    const [experienceMax, setExperienceMax] = useState(8);
    const [workTypes, setWorkTypes] = useState(['Full-time']);
    const [currency, setCurrency] = useState('INR');
    const [salaryMin, setSalaryMin] = useState('40,00,000');
    const [salaryMax, setSalaryMax] = useState('60,00,000');
    const [jobLocation, setJobLocation] = useState('Remote, India');
    const [closingDate, setClosingDate] = useState('2024-07-15');
    const [noticePeriod, setNoticePeriod] = useState('30 days');
    const [salaryPublic, setSalaryPublic] = useState(false);
    const [editPrompt, setEditPrompt] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    const addSkill = () => {
        if (newSkill.trim() && !editableDescription.skills.includes(newSkill.trim())) {
            setEditableDescription({
            ...editableDescription,
            skills: [...editableDescription.skills, newSkill.trim()]
            });
            setNewSkill('');
        }
    };

    const removeSkill = (skillToRemove) => {
        setEditableDescription({
            ...editableDescription,
            skills: editableDescription.skills.filter((skill) => skill !== skillToRemove)
        });
    };

    const addSearchTag = () => {
    if (newSearchTag.trim() && !editableDescription.searchTags.includes(newSearchTag.trim())) {
        setEditableDescription({
        ...editableDescription,
        searchTags: [...editableDescription.searchTags, newSearchTag.trim()]
        });
        setNewSearchTag('');
    }
    };

    const removeSearchTag = (tagToRemove) => {
    setEditableDescription({
        ...editableDescription,
        searchTags: editableDescription.searchTags.filter((tag) => tag !== tagToRemove)
    });
    };

    const updatePositions = (increment) => {
        if (increment) {
            setPositions(prev => prev + 1);
        } else if (positions > 1) {
            setPositions(prev => prev - 1);
        }
    };

    const updateExperienceMin = (increment) => {
        if (increment) {
            setExperienceMin(prev => Math.min(prev + 1, experienceMax));
        } else if (experienceMin > 0) {
            setExperienceMin(prev => prev - 1);
        }
    };

    const updateExperienceMax = (increment) => {
        if (increment) {
            setExperienceMax(prev => prev + 1);
        } else if (experienceMax > experienceMin) {
            setExperienceMax(prev => prev - 1);
        }
    };

    const toggleWorkType = (type) => {
        setWorkTypes(prev => {
            if (prev.includes(type)) {
            return prev.filter(t => t !== type);
            } else {
            return [...prev, type];
            }
        });
    };

    const addResponsibility = () => {
        setEditableDescription({
            ...editableDescription,
            responsibilities: [...editableDescription.responsibilities, ""]
        });
    };

    const removeResponsibility = (index) => {
        if (editableDescription.responsibilities.length > 1) {
            const newResponsibilities = editableDescription.responsibilities.filter((_, i) => i !== index);
            setEditableDescription({
            ...editableDescription,
            responsibilities: newResponsibilities
            });
        }
    };

    const handleEditWithAI = async () => {
        if (!editPrompt.trim()) return;

        setIsEditing(true);
        try {
            const fullPrompt = `Based on the current job description: "${JSON.stringify(editableDescription)}", please make the following changes: ${editPrompt}`;
            const updatedDescription = await generateJobDescription(fullPrompt);
            setEditableDescription(updatedDescription);
            setEditPrompt('');
        } catch (error) {
        } finally {
            setIsEditing(false);
        }
    };

  return (
  <div className="min-h-screen p-6 " style={{
            background: `
            radial-gradient(circle at top left, #173d51  0%, transparent 50%),
            radial-gradient(circle at bottom right, #173d51  0%, transparent 50%),
            #16191b 
            `,
        }}>
    <div className="max-w-6xl mx-auto">
      {/* Header */}
        <div className="flex items-center justify-between mb-5">
            <div className="flex items-center">
                <button 
                onClick={() => onReview(false)}
                className="mr-4 p-2 rounded-full hover:bg-gray-200 transition"
                >
                <FiArrowLeft className="w-7 h-7 text-white" />
                </button>
                <h1 className="text-2xl text-white font-bold font-sans">Review Job Description</h1>
            </div>
            <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">Last Saved 4:00 AM Jun 8</span>
                <button 
                onClick={() => onReview(true)}
                className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-500/80 hover:to-indigo-500/80 text-white font-semibold px-6 py-2 rounded-md"
                >
                Submit
                </button>
            </div>
        </div>
        <div className='space-y-6'>
            {/* Main Review Section */}
            <ResizablePanelGroup direction="horizontal" className="border border-gray-500 bg-gray-700 rounded-lg overflow-hidden">
                {/* Main Content */}
                <ResizablePanel defaultSize={65} minSize={30} maxSize={80}>
                    <div className="glass-card p-6 h-full overflow-y-auto">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm text-white font-medium mb-2">Job Title</label>
                                <input
                                    type="text"
                                    value={editableDescription.title}
                                    onChange={(e) => setEditableDescription({ ...editableDescription, title: e.target.value })}
                                    className="w-full text-sm px-3 py-2 bg-gray-900 text-white border border-gray-500 rounded"
                                />
                            </div> 
                            <div>
                                <label className="block text-sm font-medium mb-2 text-white">Experience Level</label>
                                <input
                                type="text"
                                value={editableDescription.experience}
                                onChange={(e) => setEditableDescription({ ...editableDescription, experience: e.target.value })}
                                className="w-full px-3 py-2 bg-gray-900 text-white border border-gray-500 rounded"
                                />
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2 text-white">Job Location</label>
                                    <input
                                    type="text"
                                    value={jobLocation}
                                    onChange={(e) => setJobLocation(e.target.value)}
                                    placeholder="e.g., Remote, Bangalore, Hybrid"
                                    className="w-full px-3 py-2 bg-gray-900 text-white border border-gray-500 rounded"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2 text-white">Date of Closing Application</label>
                                    <input
                                    type="date"
                                    value={closingDate}
                                    onChange={(e) => setClosingDate(e.target.value)}
                                    className="w-full px-3 py-2 bg-gray-900 text-white border border-gray-500 rounded"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2 text-white">Notice Period</label>
                                <input
                                    type="text"
                                    value={noticePeriod}
                                    onChange={(e) => setNoticePeriod(e.target.value)}
                                    placeholder="e.g., 30 days, Immediate, 2 months"
                                    className="w-full px-3 py-2 bg-gray-900 text-white border border-gray-500 rounded"
                                />
                            </div>

                            <div className="mt-4">
                                <label className="block text-sm font-medium mb-2 text-white">Company Description</label>
                                <textarea
                                    value={editableDescription.description}
                                    onChange={(e) =>
                                    setEditableDescription({ ...editableDescription, description: e.target.value })
                                    }
                                    className="w-full h-32 px-3 py-2 bg-gray-900 text-white border border-gray-500 rounded resize-none"
                                />
                            </div>
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="block text-sm font-medium text-white">Key Responsibilities</label>
                                    <button
                                        onClick={addResponsibility}
                                        className="px-3 py-1 text-sm border bg-gray-900 border-gray-500 text-white rounded hover:bg-gray-700"
                                    >
                                        Add Responsibility
                                    </button>
                                </div>
                                <div className='space-y-2'>
                                    {editableDescription.responsibilities.map((resp, index) => (
                                        <div key={index} className="flex items-start space-x-2">
                                            <span className="text-pink-500 mt-1">•</span>
                                            <textarea
                                            value={resp}
                                            onChange={(e) => {
                                                const newResponsibilities = [...editableDescription.responsibilities];
                                                newResponsibilities[index] = e.target.value;
                                                setEditableDescription({ ...editableDescription, responsibilities: newResponsibilities });
                                            }}
                                            className="flex-1 px-3 py-2 bg-gray-900 text-white border border-gray-500 rounded resize-none"
                                            rows={2}
                                            />
                                            {editableDescription.responsibilities.length > 1 && (
                                            <button
                                                onClick={() => removeResponsibility(index)}
                                                className="text-red-500 hover:text-red-700 p-1"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                {/* Sidebar */}
                <ResizablePanel defaultSize={35} minSize={37} maxSize={63}>
                    <div className="p-6 h-full overflow-y-auto space-y-6">
                        {/* Job Details */}
                        <div className="border border-gray-700 bg-gray-900 rounded-lg p-4">
                            <h3 className="font-semibold mb-4 text-white">Job Role</h3>
                            <input
                            type="text"
                            value={editableDescription.title}
                            onChange={(e) => setEditableDescription({ ...editableDescription, title: e.target.value })}
                            className="w-full px-3 py-2 bg-gray-800 text-sm text-white  border border-gray-600 rounded mb-4"
                            />
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-white">Positions</span>
                                    <div className="flex items-center space-x-2">
                                        <button
                                        onClick={() => updatePositions(false)}
                                        disabled={positions <= 1}
                                        className=" text-white px-3 py-1 text-sm border border-gray-600 rounded hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                        -
                                        </button>
                                        <span className="min-w-8 text-center text-white">{positions}</span>
                                        <button
                                        onClick={() => updatePositions(true)}
                                        className="text-white px-3 py-1 text-sm border border-gray-600 rounded hover:bg-gray-500"
                                        >
                                        +
                                        </button>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-white">Years of Experience</span>
                                    <div className="flex items-center space-x-2">
                                        <div className="flex items-center space-x-1">
                                            <button
                                                onClick={() => updateExperienceMin(false)}
                                                disabled={experienceMin <= 0}
                                                className="text-white px-3 py-1 text-sm border border-gray-600 rounded hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                -
                                            </button>
                                            <span className="min-w-8 text-center text-white">{experienceMin}</span>
                                            <button
                                                onClick={() => updateExperienceMin(true)}
                                                className="text-white px-3 py-1 text-sm border border-gray-600 rounded hover:bg-gray-500"
                                                >
                                                +
                                            </button>
                                        </div>
                                        <span className=" text-opacity-50 text-white">to</span>
                                        <div className="flex items-center space-x-1">
                                            <button
                                                onClick={() => updateExperienceMax(false)}
                                                disabled={experienceMax <= experienceMin}
                                                className="text-white px-3 py-1 text-sm border border-gray-600 rounded hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                -
                                            </button>
                                            <span className="text-white min-w-8 text-center">{experienceMax}</span>
                                            <button
                                                onClick={() => updateExperienceMax(true)}
                                                className="text-white px-3 py-1 text-sm border border-gray-600 rounded hover:bg-gray-500"
                                                >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Work Type */}
                        <div className="border border-gray-700 bg-gray-900 rounded-lg p-4">
                            <h3 className="font-semibold mb-4 text-white">Work Type</h3>
                            <div className="flex flex-wrap gap-2">
                                {['Full-time', 'Internship', 'Contractual'].map((type) => (
                                <span
                                    key={type}
                                    onClick={() => toggleWorkType(type)}
                                    className={`px-3 py-1 text-sm rounded cursor-pointer border 
                                    ${workTypes.includes(type) 
                                        ? 'bg-white text-black border-transparent' 
                                        : 'text-gray-300 border-gray-500 hover:bg-gray-700'}`}
                                >
                                    {type}
                                </span>
                                ))}
                            </div>
                        </div>
                        {/* Salary */}
                        <div className="border border-gray-700 bg-gray-900 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-semibold text-white">Annual Salary Range</h3>
                                <button
                                onClick={() => setSalaryPublic(!salaryPublic)}
                                className="flex items-center space-x-1 px-3 py-1 text-sm border border-gray-600 rounded hover:bg-gray-700"
                                >
                                {salaryPublic ? <Eye className="w-4 h-4 text-white" /> : <EyeOff className="w-4 h-4 text-white" />}
                                <span className="text-white">{salaryPublic ? 'Public' : 'Private'}</span>
                                </button>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                <select
                                    value={currency}
                                    onChange={(e) => setCurrency(e.target.value)}
                                    className="bg-gray-800 text-white border border-gray-700 rounded px-2 py-1"
                                >
                                    <option value="INR">INR</option>
                                    <option value="USD">USD</option>
                                    <option value="EUR">EUR</option>
                                    <option value="GBP">GBP</option>
                                </select>

                                <input
                                    type="text"
                                    placeholder="Min Value"
                                    value={salaryMin}
                                    onChange={(e) => setSalaryMin(e.target.value)}
                                    className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded"
                                />
                                <input
                                    type="text"
                                    placeholder="Max Value"
                                    value={salaryMax}
                                    onChange={(e) => setSalaryMax(e.target.value)}
                                    className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded"
                                />
                                </div>

                                <div className="flex items-center justify-between text-sm text-gray-400">
                                <span>Currency</span>
                                <span>Min Value</span>
                                <span>Max Value</span>
                                </div>
                            </div>
                        </div>
                        {/* Skills */}
                        <div className="border border-gray-700 bg-gray-900 rounded-lg p-4">
                            <h3 className="font-semibold mb-4 text-white">Skills Tags (optional)</h3>

                            <div className="flex flex-wrap gap-2 mb-3">
                                {editableDescription.skills.map((skill) => (
                                <span
                                    key={skill}
                                    className="flex items-center gap-1 border border-gray-500 hover:bg-gray-700 text-sm text-white px-2 py-1 rounded"
                                >
                                    {skill}
                                    <X
                                    className="w-3 h-3 cursor-pointer hover:text-red-500"
                                    onClick={() => removeSkill(skill)}
                                    />
                                </span>
                                ))}
                            </div>

                            <div className="flex space-x-2">
                                <input
                                type="text"
                                placeholder="E.g. Javascript"
                                value={newSkill}
                                onChange={(e) => setNewSkill(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                                className="flex-1 px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded"
                                />
                                <button
                                onClick={addSkill}
                                className="px-4 py-2 text-sm border border-gray-600 rounded text-white hover:bg-gray-700"
                                >
                                Add
                                </button>
                            </div>
                        </div>
                        {/* Search Tags */}
                        <div className="border border-gray-700 bg-gray-900 rounded-lg p-4">
                            <h3 className="font-semibold mb-4 text-white">Search Tags (optional)</h3>
                            <div className="flex flex-wrap gap-2 mb-3">
                                {editableDescription.searchTags.map((tag) => (
                                    <span
                                    key={tag}
                                    className="flex items-center gap-1 border border-gray-500 hover:bg-gray-700 text-sm text-white px-2 py-1 rounded"
                                    >
                                    {tag}
                                    <X
                                        className="w-3 h-3 cursor-pointer hover:text-red-500"
                                        onClick={() => removeSearchTag(tag)}
                                    />
                                    </span>
                                ))}
                            </div>

                            <div className="flex space-x-2">
                                <input
                                    type="text"
                                    placeholder="E.g. ReqID, HM Name, etc."
                                    value={newSearchTag}
                                    onChange={(e) => setNewSearchTag(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && addSearchTag()}
                                    className="flex-1 px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded"
                                />
                                <button
                                    onClick={addSearchTag}
                                    className="px-4 py-2 text-sm border border-gray-600 rounded text-white hover:bg-gray-700"
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
            {/* AI Edit Section */}
            <div className="border border-gray-700 bg-gray-900 rounded-lg p-6">
                

                <p className="text-sm text-gray-400 mb-4">
                    Describe what changes you'd like to make to the job description and AI will update it automatically.
                </p>

                <div className="flex space-x-4">
                    <textarea
                    placeholder="E.g., 'Add more emphasis on teamwork skills', 'Change experience requirement to 5+ years', 'Add remote work benefits'..."
                    value={editPrompt}
                    onChange={(e) => setEditPrompt(e.target.value)}
                    className="flex-1 px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded resize-none"
                    rows={2}
                    />

                    <button
                    onClick={handleEditWithAI}
                    disabled={!editPrompt.trim() || isEditing}
                    className={`flex items-center justify-center px-6 py-2 font-semibold text-white rounded 
                        ${(!editPrompt.trim() || isEditing)
                        ? 'bg-gray-600 cursor-not-allowed'
                        : 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600'}`}
                    >
                    {isEditing ? (
                        <>
                        <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                        Updating...
                        </>
                    ) : (
                        <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Update with AI
                        </>
                    )}
                    </button>
                </div>
            </div>
        </div>
    </div>
  </div>
);
}

export default JobDescriptionReview;
