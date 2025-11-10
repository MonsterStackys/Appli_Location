import { useState } from 'react';
import { motion } from 'motion/react';
import { Plus } from 'lucide-react';
import { currentUser, mockStories, Story } from '../lib/mockData';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { AddStoryModal } from './AddStoryModal';
import { StoryViewer } from './StoryViewer';

export function MobileStories() {
  const [showAddStory, setShowAddStory] = useState(false);
  const [viewingStories, setViewingStories] = useState<Story[] | null>(null);
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(0);

  const userStories = mockStories.filter(s => s.agencyId === currentUser.id);
  const otherStories = mockStories.filter(s => s.agencyId !== currentUser.id);

  const handleMyStoryClick = (e: React.MouseEvent) => {
    // Si clic sur l'avatar, ouvrir l'ajout
    const target = e.target as HTMLElement;
    if (target.closest('.add-story-trigger')) {
      setShowAddStory(true);
    } else if (userStories.length > 0) {
      // Sinon voir les statuts
      setViewingStories(userStories);
      setSelectedStoryIndex(0);
    } else {
      // Pas de statuts, rediriger vers l'ajout
      setShowAddStory(true);
    }
  };

  const handleOtherStoryClick = (stories: Story[], startIndex: number) => {
    setViewingStories(stories);
    setSelectedStoryIndex(startIndex);
  };

  const groupStoriesByUser = () => {
    const groups: { [key: string]: Story[] } = {};
    otherStories.forEach(story => {
      if (!groups[story.agencyId]) {
        groups[story.agencyId] = [];
      }
      groups[story.agencyId].push(story);
    });
    return Object.values(groups);
  };

  const storiesGroups = groupStoriesByUser();

  return (
    <>
      <div className="mb-4">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {/* Mon statut */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-shrink-0"
          >
            <div
              onClick={handleMyStoryClick}
              className="relative w-28 h-40 rounded-2xl overflow-hidden cursor-pointer group"
              style={{
                backgroundImage: userStories.length > 0 
                  ? `url(${userStories[0].image})`
                  : `linear-gradient(135deg, #009E60, #007d4d)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
              
              {/* Avatar avec plus */}
              <div className="absolute top-2 left-2 add-story-trigger">
                <div className="relative">
                  <Avatar className="w-10 h-10 ring-4 ring-white">
                    <AvatarImage src={currentUser.avatar} />
                    <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 bg-[#009E60] text-white rounded-full p-1 ring-2 ring-white">
                    <Plus className="w-3 h-3" />
                  </div>
                </div>
              </div>

              {/* Texte */}
              <div className="absolute bottom-2 left-2 right-2">
                <p className="text-white text-xs text-center drop-shadow-lg">
                  {userStories.length > 0 ? 'Mon statut' : 'Ajouter un statut'}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Statuts des autres utilisateurs */}
          {storiesGroups.map((stories, groupIndex) => {
            const firstStory = stories[0];
            const hasUnviewed = stories.some(s => !s.viewed);
            
            return (
              <motion.div
                key={firstStory.agencyId}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: (groupIndex + 1) * 0.05 }}
                className="flex-shrink-0"
              >
                <div
                  onClick={() => handleOtherStoryClick(stories, 0)}
                  className="relative w-28 h-40 rounded-2xl overflow-hidden cursor-pointer group"
                  style={{
                    backgroundImage: `url(${firstStory.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70 group-hover:from-black/60 group-hover:to-black/80 transition-all" />
                  
                  {/* Avatar */}
                  <div className="absolute top-2 left-2">
                    <Avatar 
                      className={`w-10 h-10 ring-[3px] ${
                        hasUnviewed 
                          ? 'ring-[#009E60]' 
                          : 'ring-gray-400'
                      }`}
                    >
                      <AvatarImage src={firstStory.agencyAvatar} />
                      <AvatarFallback>{firstStory.agencyName[0]}</AvatarFallback>
                    </Avatar>
                  </div>

                  {/* Nom */}
                  <div className="absolute bottom-2 left-2 right-2">
                    <p className="text-white text-xs text-center drop-shadow-lg line-clamp-2">
                      {firstStory.agencyName}
                    </p>
                  </div>

                  {/* Badge nombre de statuts */}
                  {stories.length > 1 && (
                    <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded-full">
                      {stories.length}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <AddStoryModal
        isOpen={showAddStory}
        onClose={() => setShowAddStory(false)}
        onStoryAdded={() => {
          // Recharger les statuts
        }}
      />

      {viewingStories && (
        <StoryViewer
          stories={viewingStories}
          initialIndex={selectedStoryIndex}
          onClose={() => {
            setViewingStories(null);
            setSelectedStoryIndex(0);
          }}
        />
      )}
    </>
  );
}
