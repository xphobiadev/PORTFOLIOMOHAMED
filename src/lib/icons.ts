import { 
    Award, 
    Camera, 
    Clapperboard, 
    Film, 
    Globe2, 
    Layers, 
    Palette, 
    Star, 
    Video, 
    Zap,
    BadgeCheck,
    Eye,
    TimerReset
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
    Award,
    Camera,
    Clapperboard,
    Film,
    Globe: Globe2,
    Globe2,
    Layers,
    Palette,
    Star,
    Video,
    Zap,
    BadgeCheck,
    Eye,
    TimerReset
};

export function getIcon(iconName: string | any): LucideIcon {
    if (typeof iconName !== "string") return iconName || Star;
    return iconMap[iconName] || Star;
}
