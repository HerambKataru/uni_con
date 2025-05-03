import { Mail, MapPin, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Administrator } from "@shared/schema";
import { getInitials, generateAvatarUrl } from "@/lib/utils";

interface AdministratorCardProps {
  administrator: Administrator;
}

export default function AdministratorCard({ administrator }: AdministratorCardProps) {
  const { name, designation, department, email, officeAddress, phone, photoUrl } = administrator;
  
  const avatarUrl = photoUrl || generateAvatarUrl(name);
  const initials = getInitials(name);

  return (
    <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex items-start">
          <Avatar className="w-16 h-16 mr-4">
            <AvatarImage src={avatarUrl} alt={name} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-semibold text-lg">{name}</h4>
            <p className="text-primary font-medium">{designation}</p>
            <p className="text-muted-foreground text-sm mt-1">{department}</p>
          </div>
        </div>
        
        <hr className="my-4 border-border" />
        
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <Mail className="text-gray-500 mr-2 h-4 w-4" />
            <a href={`mailto:${email}`} className="text-primary hover:underline">
              {email}
            </a>
          </div>
          
          {officeAddress && (
            <div className="flex items-center text-sm">
              <MapPin className="text-gray-500 mr-2 h-4 w-4" />
              <span className="text-gray-700">{officeAddress}</span>
            </div>
          )}
          
          {phone && (
            <div className="flex items-center text-sm">
              <Phone className="text-gray-500 mr-2 h-4 w-4" />
              <span className="text-gray-700">{phone}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
