-- Add analysis column to posts table
ALTER TABLE posts ADD COLUMN IF NOT EXISTS analysis JSONB;

-- Example of what the JSONB might look like:
-- {
--   "speed": 85,
--   "technique": 92,
--   "tags": ["High Tempo", "Good Vision"],
--   "summary": "Excellent ball control displayed in this clip."
-- }
