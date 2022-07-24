import { Comment } from './comment';
export class dish{
    id: string;
    name: string;
    image: string;
    category: string;
    featured: boolean;
    label: string;
    price: string
    description: string;
    comments: Comment[];
}