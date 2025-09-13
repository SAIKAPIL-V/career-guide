'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const slidesContent = [
  {
    headline: 'Discover Your Perfect Career Path',
    description: 'Our AI-powered assessment helps you find the stream and career that best fits your personality and interests.',
    buttonText: 'Take the Test',
    href: '/assessment',
  },
  {
    headline: 'Unlock Your Future with the Right Degree',
    description: 'Explore thousands of courses and find the one that opens doors to your dream job.',
    buttonText: 'Explore Courses',
    href: '/courses',
  },
  {
    headline: 'Connect with Top Government Colleges',
    description: 'Find detailed information about government colleges near you and simplify your admission process.',
    buttonText: 'Find Colleges',
    href: '/colleges',
  },
  {
    headline: 'Map Your Journey from Course to Career',
    description: 'Visualize your entire career trajectory, from your first class to your professional life.',
    buttonText: 'View Career Maps',
    href: '/careers',
  },
  {
    headline: 'Stay Ahead with Important Updates',
    description: 'Never miss an application deadline, scholarship, or entrance exam with our timely notifications.',
    buttonText: 'Get Notified',
    href: '/notifications',
  },
];

export default function HeroSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000, stopOnInteraction: false }),
  ]);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setActiveIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  const slides = PlaceHolderImages.slice(0, 5);

  return (
    <div className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden" ref={emblaRef}>
      <div className="flex h-full">
        {slides.map((slide, index) => (
          <div
            className={cn(
              'relative min-w-0 shrink-0 grow-0 basis-full h-full',
              index === activeIndex && 'slide-active'
            )}
            key={slide.id}
          >
            <Image
              src={slide.imageUrl}
              alt={slide.description}
              data-ai-hint={slide.imageHint}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative h-full flex flex-col justify-center items-center text-center text-white p-4">
              <div className="hero-slide-content">
                <h1 className="font-headline text-4xl md:text-6xl font-bold max-w-4xl">
                  {slidesContent[index].headline}
                </h1>
                <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto opacity-90">
                  {slidesContent[index].description}
                </p>
                <Button asChild size="lg" className="mt-8 text-lg font-bold group bg-primary hover:bg-primary/90">
                  <Link href={slidesContent[index].href}>
                    {slidesContent[index].buttonText}{' '}
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-white/20 border-white/30 text-white hover:bg-white/30"
        variant="outline"
        size="icon"
        aria-label="Previous slide"
      >
        <ArrowLeft className="h-6 w-6" />
      </Button>
      <Button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-white/20 border-white/30 text-white hover:bg-white/30"
        variant="outline"
        size="icon"
        aria-label="Next slide"
      >
        <ArrowRight className="h-6 w-6" />
      </Button>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={cn(
              'w-2 h-2 rounded-full transition-all duration-300',
              index === activeIndex ? 'p-1.5 bg-white' : 'bg-white/50'
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
