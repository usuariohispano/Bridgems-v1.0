-- Add XP column to players if not exists
ALTER TABLE players ADD COLUMN IF NOT EXISTS xp INT DEFAULT 0;

-- Challenges Table
CREATE TABLE public.challenges (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Technical', 'Physical', 'Tactical', 'Mental')),
  difficulty TEXT NOT NULL CHECK (difficulty IN ('Beginner', 'Intermediate', 'Advanced', 'Elite')),
  xp_reward INT DEFAULT 10,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- User Challenges (Progress)
CREATE TABLE public.user_challenges (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  challenge_id UUID REFERENCES public.challenges(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed')),
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, challenge_id)
);

-- RLS
ALTER TABLE challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_challenges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Everyone can read challenges" ON challenges FOR SELECT USING (true);

CREATE POLICY "Users can manage their own challenge progress" ON user_challenges
  USING (auth.uid() = user_id);

-- Seed some challenges
INSERT INTO challenges (title, description, category, difficulty, xp_reward) VALUES
('Dominio Básico', 'Realiza 50 toques sin dejar caer el balón usando ambos pies.', 'Technical', 'Beginner', 50),
('Sprint 100m', 'Completa 5 sprints de 100m en menos de 15 segundos cada uno.', 'Physical', 'Intermediate', 100),
('Lectura de Juego', 'Analiza 3 clips de video y escribe tu interpretación táctica.', 'Tactical', 'Advanced', 150);
