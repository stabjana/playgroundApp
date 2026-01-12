import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';

export interface PlaygroundFeature {
  id: string;
  name: string;
  icon?: string;
}

export interface PlaygroundImage {
  id: string;
  image_url: string;
  user_profile_id?: string | null;
}

export interface PlaygroundReview {
  id: string;
  rating?: number;
  comment?: string;
  age_min?: number;
  age_max?: number;
  user_profile_id?: string | null;
}

export interface PlaygroundAddress {
  street?: string;
  city?: string;
  postal_code?: string;
  latitude?: number;
  longitude?: number;
}

export interface Playground {
  id: string;
  name: string;
  description?: string | null;
  manufacturer_age_min?: number | null;
  manufacturer_age_max?: number | null;
  avg_rating?: number | null;
  address?: PlaygroundAddress;
  features?: PlaygroundFeature[];
  images?: PlaygroundImage[];
  reviews?: PlaygroundReview[];
}

@Injectable()
export class PlaygroundService {
  private playgrounds: Playground[];

  constructor() {
    const filePath = join(
      __dirname,
      'playgrounds.data.json',
    );
    const raw = readFileSync(filePath, 'utf8');
    this.playgrounds = JSON.parse(raw) as Playground[];
  }

  findAll(): Playground[] {
    return this.playgrounds;
  }

  findOne(id: string): Playground | undefined {
    return this.playgrounds.find((p) => p.id === id);
  }
}
