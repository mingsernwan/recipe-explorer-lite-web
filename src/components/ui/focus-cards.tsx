"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
  }: {
    card: Card;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  }) => (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "rounded-lg relative bg-gray-100 dark:bg-neutral-900 overflow-hidden h-72 aspect-square transition-all duration-300 ease-out",
        hovered !== null && hovered !== index && "blur-sm scale-[0.98]"
      )}
    >
      <img
        src={card.src}
        alt={card.title}
        className="object-cover absolute inset-0"
      />
      <div
        className={cn(
          "absolute inset-0 bg-black/20 sm:bg-black/50 flex items-end py-8 px-4 transition-opacity duration-300",
          "opacity-100",
          "sm:opacity-0",
          hovered === index && "sm:opacity-100"
        )}
      >
        {" "}
        <div className="text-xl md:text-2xl font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-200">
          {card.title}
        </div>
      </div>
    </div>
  )
);

Card.displayName = "Card";

type Card = {
  title: string;
  src: string;
  idMeal: string;
};

export function FocusCards({ cards }: { cards: Card[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-5xl mx-auto md:px-8 w-full place-items-center">
      {cards.map((card, index) => (
        <Link key={card.title} href={`/recipes/details/${card.idMeal}`}>
          <Card
            card={card}
            index={index}
            hovered={hovered}
            setHovered={setHovered}
          />
        </Link>
      ))}
    </div>
  );
}
