-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

-- Enable required extensions (ignore errors if already installed)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

CREATE TABLE public.favourites (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  playground_id uuid NOT NULL,
  user_id uuid NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT favourites_pkey PRIMARY KEY (id),
  CONSTRAINT favourites_playground_id_fkey FOREIGN KEY (playground_id) REFERENCES public.playgrounds(id),
  CONSTRAINT favourites_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.features (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  name text NOT NULL UNIQUE,
  icon text,
  description text,
  CONSTRAINT features_pkey PRIMARY KEY (id)
);
CREATE TABLE public.images (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  playground_id uuid NOT NULL,
  user_id uuid,
  image_url text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT images_pkey PRIMARY KEY (id),
  CONSTRAINT images_playground_id_fkey FOREIGN KEY (playground_id) REFERENCES public.playgrounds(id),
  CONSTRAINT images_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.playground_addresses (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  playground_id uuid NOT NULL,
  street text,
  city text,
  postal_code text,
  latitude double precision,
  longitude double precision,
  geom USER-DEFINED,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT playground_addresses_pkey PRIMARY KEY (id),
  CONSTRAINT playground_addresses_playground_id_fkey FOREIGN KEY (playground_id) REFERENCES public.playgrounds(id)
);
CREATE TABLE public.playground_features (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  playground_id uuid,
  feature_id uuid,
  added_by uuid,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT playground_features_pkey PRIMARY KEY (id),
  CONSTRAINT playground_features_playground_id_fkey FOREIGN KEY (playground_id) REFERENCES public.playgrounds(id),
  CONSTRAINT playground_features_feature_id_fkey FOREIGN KEY (feature_id) REFERENCES public.features(id),
  CONSTRAINT playground_features_added_by_fkey FOREIGN KEY (added_by) REFERENCES auth.users(id)
);
CREATE TABLE public.playgrounds (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  description text,
  manufacturer_age_min integer,
  manufacturer_age_max integer,
  avg_rating numeric DEFAULT 0,
  created_by uuid,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT playgrounds_pkey PRIMARY KEY (id),
  CONSTRAINT playgrounds_created_by_fkey FOREIGN KEY (created_by) REFERENCES auth.users(id)
);
CREATE TABLE public.reviews (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  playground_id uuid NOT NULL,
  user_id uuid NOT NULL,
  rating integer CHECK (rating >= 1 AND rating <= 5),
  comment text,
  age_min integer,
  age_max integer,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT reviews_pkey PRIMARY KEY (id),
  CONSTRAINT reviews_playground_id_fkey FOREIGN KEY (playground_id) REFERENCES public.playgrounds(id),
  CONSTRAINT reviews_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.spatial_ref_sys (
  srid integer NOT NULL CHECK (srid > 0 AND srid <= 998999),
  auth_name character varying,
  auth_srid integer,
  srtext character varying,
  proj4text character varying,
  CONSTRAINT spatial_ref_sys_pkey PRIMARY KEY (srid)
);
CREATE TABLE public.user_profiles (
  id uuid NOT NULL,
  username text,
  avatar_url text,
  created_at timestamp with time zone DEFAULT now(),
  email text,
  CONSTRAINT user_profiles_pkey PRIMARY KEY (id),
  CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id)
);