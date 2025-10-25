import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { UserIcon, MailIcon, CalendarIcon, MapPinIcon, BriefcaseIcon, LinkIcon, EditIcon, ImageIcon, SaveIcon } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { useAppContext } from '../../context/AppContext';
import { toast } from 'sonner';
export const UserProfile = () => {
  const {
    user
  } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || 'User',
    bio: 'Content creator and digital marketing specialist with 5+ years of experience.',
    location: 'San Francisco, CA',
    website: 'https://example.com',
    company: 'Creozel',
    joinDate: 'January 2021'
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSave = () => {
    // Here you would typically save to your backend
    setIsEditing(false);
    toast.success('Profile updated successfully');
  };
  return <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Profile
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Manage your personal information and account settings
          </p>
        </div>
        <Button variant={isEditing ? 'outline' : 'primary'} leftIcon={isEditing ? <SaveIcon size={16} /> : <EditIcon size={16} />} onClick={() => isEditing ? handleSave() : setIsEditing(true)}>
          {isEditing ? 'Save Profile' : 'Edit Profile'}
        </Button>
      </div>
      <Card className="overflow-hidden">
        {/* Cover Photo */}
        <div className="h-40 bg-gradient-to-r from-blue-400 to-indigo-500 relative">
          {isEditing && <button className="absolute bottom-3 right-3 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg">
              <ImageIcon size={18} className="text-gray-700 dark:text-gray-300" />
            </button>}
        </div>
        <div className="p-6 pt-0 -mt-16">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden bg-white dark:bg-gray-800 shadow-lg">
                <img src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80'} alt="Profile" className="w-full h-full object-cover" />
              </div>
              {isEditing && <button className="absolute bottom-2 right-2 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg">
                  <ImageIcon size={14} className="text-gray-700 dark:text-gray-300" />
                </button>}
            </div>
            {/* Profile Info */}
            <div className="flex-1 pt-16 md:pt-0">
              <div className="space-y-4">
                {isEditing ? <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="text-2xl font-bold text-gray-900 dark:text-white bg-transparent border-b border-gray-300 dark:border-gray-700 w-full pb-1 focus:outline-none focus:border-blue-500" /> : <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {formData.name}
                  </h2>}
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <MailIcon size={16} className="mr-2" />
                    <span>{user?.email || 'user@example.com'}</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <CalendarIcon size={16} className="mr-2" />
                    <span>Joined {formData.joinDate}</span>
                  </div>
                  {isEditing ? <div className="flex items-center text-gray-600 dark:text-gray-400 w-full mt-2">
                      <MapPinIcon size={16} className="mr-2 flex-shrink-0" />
                      <input type="text" name="location" value={formData.location} onChange={handleInputChange} className="bg-transparent border-b border-gray-300 dark:border-gray-700 w-full pb-1 focus:outline-none focus:border-blue-500" />
                    </div> : <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <MapPinIcon size={16} className="mr-2" />
                      <span>{formData.location}</span>
                    </div>}
                </div>
                {isEditing ? <div className="pt-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Bio
                    </label>
                    <textarea name="bio" value={formData.bio} onChange={handleInputChange} rows={4} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-white" />
                  </div> : <p className="text-gray-600 dark:text-gray-300 pt-2">
                    {formData.bio}
                  </p>}
                <div className="pt-4 space-y-3">
                  {isEditing ? <>
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <BriefcaseIcon size={16} className="mr-2 flex-shrink-0" />
                        <input type="text" name="company" value={formData.company} onChange={handleInputChange} className="bg-transparent border-b border-gray-300 dark:border-gray-700 w-full pb-1 focus:outline-none focus:border-blue-500" placeholder="Company" />
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <LinkIcon size={16} className="mr-2 flex-shrink-0" />
                        <input type="text" name="website" value={formData.website} onChange={handleInputChange} className="bg-transparent border-b border-gray-300 dark:border-gray-700 w-full pb-1 focus:outline-none focus:border-blue-500" placeholder="Website" />
                      </div>
                    </> : <>
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <BriefcaseIcon size={16} className="mr-2" />
                        <span>{formData.company}</span>
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <LinkIcon size={16} className="mr-2" />
                        <a href={formData.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                          {formData.website}
                        </a>
                      </div>
                    </>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
      {/* Additional profile sections can be added here */}
    </div>;
};