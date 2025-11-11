import { motion } from 'motion/react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Dialog, DialogContent } from './ui/dialog';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Story } from '../lib/mockData';

interface AgencyStoriesProps {
  stories: Story[];
}

export function AgencyStories({ stories }: AgencyStoriesProps) {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const groupedStories = stories.reduce((acc, story) => {
    if (!acc[story.agencyId]) {
      acc[story.agencyId] = {
        agencyId: story.agencyId,
        agencyName: story.agencyName,
        agencyAvatar: story.agencyAvatar,
        stories: [],
        hasUnviewed: false
      };
    }
    acc[story.agencyId].stories.push(story);
    if (!story.viewed) {
      acc[story.agencyId].hasUnviewed = true;
    }
    return acc;
  }, {} as Record<string, {
    agencyId: string;
    agencyName: string;
    agencyAvatar: string;
    stories: Story[];
    hasUnviewed: boolean;
  }>);

  const agencyGroups = Object.values(groupedStories);

  const handleStoryClick = (agency: typeof agencyGroups[0]) => {
    setSelectedStory(agency.stories[0]);
    setCurrentIndex(0);
  };

  const handleNext = () => {
    if (!selectedStory) return;
    const agency = groupedStories[selectedStory.agencyId];
    const nextIndex = (currentIndex + 1) % agency.stories.length;
    setCurrentIndex(nextIndex);
    setSelectedStory(agency.stories[nextIndex]);
  };

  const handlePrevious = () => {
    if (!selectedStory) return;
    const agency = groupedStories[selectedStory.agencyId];
    const prevIndex = currentIndex === 0 ? agency.stories.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    setSelectedStory(agency.stories[prevIndex]);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-border p-4 mb-4">
        <h3 className="mb-3">Statuts des agences</h3>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {agencyGroups.map((agency) => (
            <motion.button
              key={agency.agencyId}
              onClick={() => handleStoryClick(agency)}
              className="flex flex-col items-center gap-2 flex-shrink-0 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className={`p-0.5 rounded-full ${
                agency.hasUnviewed 
                  ? 'bg-gradient-to-tr from-[#FCD116] via-[#009E60] to-[#3A75C4]'
                  : 'bg-gray-200'
              }`}>
                <div className="p-0.5 bg-white rounded-full">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={agency.agencyAvatar} />
                    <AvatarFallback>{agency.agencyName[0]}</AvatarFallback>
                  </Avatar>
                </div>
              </div>
              <span className="text-xs text-center w-20 truncate">
                {agency.agencyName}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedStory} onOpenChange={() => setSelectedStory(null)}>
        <DialogContent className="max-w-lg p-0 bg-transparent border-0 overflow-hidden">
          {selectedStory && (
            <div className="relative h-[80vh] bg-black rounded-lg overflow-hidden">
              {/* Header */}
              <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/80 to-transparent z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10 border-2 border-white">
                      <AvatarImage src={selectedStory.agencyAvatar} />
                      <AvatarFallback>{selectedStory.agencyName[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-white text-sm">{selectedStory.agencyName}</p>
                      <p className="text-white/80 text-xs">
                        {new Date(selectedStory.updated_at).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedStory(null)}
                    className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Progress bars */}
                <div className="flex gap-1 mt-3">
                  {groupedStories[selectedStory.agencyId].stories.map((_, idx) => (
                    <div
                      key={idx}
                      className="flex-1 h-0.5 bg-white/30 rounded-full overflow-hidden"
                    >
                      <div
                        className={`h-full bg-white transition-all ${
                          idx === currentIndex ? 'w-full' : idx < currentIndex ? 'w-full' : 'w-0'
                        }`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Story Image */}
              <img
                src={selectedStory.image}
                alt={selectedStory.title}
                className="w-full h-full object-contain"
              />

              {/* Story Info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-white mb-2">{selectedStory.title}</h3>
                <p className="text-white/90 text-sm">{selectedStory.description}</p>
              </div>

              {/* Navigation */}
              <button
                onClick={handlePrevious}
                className="absolute left-2 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 p-2 rounded-full transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 p-2 rounded-full transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}