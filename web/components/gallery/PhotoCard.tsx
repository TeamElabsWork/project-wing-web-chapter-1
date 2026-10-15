import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Camera, Calendar } from 'lucide-react';

export interface PhotoCardProps {
  id: string;
  title: string;
  imageUrl: string;
  ownerName: string;
  ownerId: string;
  createdAt: string | Date;
  cameraModel?: string;
}

export function PhotoCard({
  id,
  title,
  imageUrl,
  ownerName,
  ownerId,
  createdAt,
  cameraModel,
}: PhotoCardProps) {
  const formattedDate = new Date(createdAt).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="group relative overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800 transition hover:border-zinc-700 hover:shadow-xl">
      <Link href={`/photos/${id}`} className="block relative aspect-[4/3] w-full overflow-hidden bg-zinc-950">
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
      </Link>

      <div className="p-4">
        <Link href={`/photos/${id}`} className="block">
          <h3 className="font-semibold text-white truncate text-base hover:text-amber-400 transition">
            {title}
          </h3>
        </Link>

        <div className="mt-2 flex items-center justify-between text-xs text-zinc-400">
          <Link href={`/users/${ownerId}`} className="hover:text-white transition truncate max-w-[60%]">
            By <span className="font-medium text-zinc-300">{ownerName}</span>
          </Link>
          <span className="flex items-center space-x-1">
            <Calendar className="h-3 w-3" />
            <span>{formattedDate}</span>
          </span>
        </div>

        {cameraModel && (
          <div className="mt-2.5 flex items-center space-x-1.5 text-xs text-amber-400/90 bg-amber-500/10 px-2 py-1 rounded-md w-fit">
            <Camera className="h-3 w-3" />
            <span className="truncate max-w-[200px]">{cameraModel}</span>
          </div>
        )}
      </div>
    </div>
  );
}
