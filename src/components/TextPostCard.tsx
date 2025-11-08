import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Heart, MessageCircle, Eye } from 'lucide-react';
import { motion } from 'motion/react';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

export interface TextPost {
  id: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    type: 'particulier' | 'agence';
  };
  content: string;
  backgroundColor: string;
  category: 'Maison' | 'Appartement' | 'Villa' | 'Terrain' | 'Bureau' | 'Autre';
  likes: number;
  likedByCurrentUser: boolean;
  comments: number;
  views: number;
  postedAt: string;
}

interface TextPostCardProps {
  post: TextPost;
  onLike: (postId: string) => void;
  onComment: (postId: string) => void;
  onViewProfile: (userId: string) => void;
}

export function TextPostCard({ post, onLike, onComment, onViewProfile }: TextPostCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-4"
    >
      <Card className="overflow-hidden">
        {/* Header */}
        <div className="p-4 flex items-center justify-between border-b border-border">
          <div 
            className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => onViewProfile(post.author.id)}
          >
            <Avatar className="w-10 h-10">
              <AvatarImage src={post.author.avatar} />
              <AvatarFallback>{post.author.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm">{post.author.name}</p>
              <p className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(post.postedAt), {
                  addSuffix: true,
                  locale: fr,
                })}
              </p>
            </div>
          </div>
          
          <Badge className="bg-[#009E60]">
            {post.category}
          </Badge>
        </div>

        {/* Text Content with Background */}
        <div
          className="relative h-64 flex items-center justify-center p-8 text-white"
          style={{ backgroundColor: post.backgroundColor }}
        >
          <p className="text-xl text-center max-w-md break-words">
            {post.content}
          </p>
        </div>

        {/* Footer */}
        <div className="p-4">
          {/* Stats */}
          <div className="flex items-center justify-between mb-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Heart className={`w-4 h-4 ${post.likedByCurrentUser ? 'fill-red-500 text-red-500' : ''}`} />
                {post.likes}
              </span>
              <span className="flex items-center gap-1">
                <MessageCircle className="w-4 h-4" />
                {post.comments}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {post.views}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onLike(post.id)}
              className={`flex-1 gap-2 ${
                post.likedByCurrentUser 
                  ? 'text-red-500 hover:text-red-600' 
                  : ''
              }`}
            >
              <Heart className={`w-4 h-4 ${post.likedByCurrentUser ? 'fill-current' : ''}`} />
              J'aime
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onComment(post.id)}
              className="flex-1 gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Commenter
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
