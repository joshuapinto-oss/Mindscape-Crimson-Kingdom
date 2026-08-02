// Structured topic database. Each entry is a jumping-off point — the API route
// fetches real, current research for it and an AI model turns that into a
// summary + content ideas. `seed` is the search query sent to the research
// APIs, kept short and specific so results stay on-topic.

export const CATEGORIES = [
  { key: "cognitive-biases", label: "Cognitive biases", emoji: "🧠" },
  { key: "attachment-theory", label: "Attachment theory", emoji: "🔗" },
  { key: "social-psychology", label: "Social psychology", emoji: "👥" },
  { key: "learning-theories", label: "Learning theories", emoji: "📘" },
  { key: "personality", label: "Personality", emoji: "🎭" },
  { key: "developmental-psychology", label: "Developmental psychology", emoji: "🌱" },
  { key: "neuroscience", label: "Neuroscience", emoji: "⚡" },
  { key: "clinical-psychology", label: "Clinical psychology", emoji: "🩺" },
  { key: "research-methods", label: "Research methods", emoji: "🔬" },
];

export const TOPICS = [
  // cognitive biases
  { id: 1, cat: "cognitive-biases", name: "Confirmation bias", seed: "confirmation bias" },
  { id: 2, cat: "cognitive-biases", name: "Anchoring effect", seed: "anchoring effect judgment" },
  { id: 3, cat: "cognitive-biases", name: "Availability heuristic", seed: "availability heuristic" },
  { id: 4, cat: "cognitive-biases", name: "Sunk cost fallacy", seed: "sunk cost fallacy" },
  { id: 5, cat: "cognitive-biases", name: "Dunning-Kruger effect", seed: "Dunning-Kruger effect" },
  { id: 6, cat: "cognitive-biases", name: "Halo effect", seed: "halo effect perception" },

  // attachment theory
  { id: 7, cat: "attachment-theory", name: "Secure attachment", seed: "secure attachment adult relationships" },
  { id: 8, cat: "attachment-theory", name: "Anxious attachment", seed: "anxious attachment style" },
  { id: 9, cat: "attachment-theory", name: "Avoidant attachment", seed: "avoidant attachment style" },
  { id: 10, cat: "attachment-theory", name: "Disorganized attachment", seed: "disorganized attachment" },
  { id: 11, cat: "attachment-theory", name: "Internal working models", seed: "internal working models attachment" },
  { id: 12, cat: "attachment-theory", name: "The Strange Situation procedure", seed: "strange situation Ainsworth" },

  // social psychology
  { id: 13, cat: "social-psychology", name: "The bystander effect", seed: "bystander effect" },
  { id: 14, cat: "social-psychology", name: "Groupthink", seed: "groupthink decision making" },
  { id: 15, cat: "social-psychology", name: "Social loafing", seed: "social loafing group performance" },
  { id: 16, cat: "social-psychology", name: "Conformity", seed: "conformity Asch social influence" },
  { id: 17, cat: "social-psychology", name: "Obedience to authority", seed: "obedience authority Milgram" },
  { id: 18, cat: "social-psychology", name: "The fundamental attribution error", seed: "fundamental attribution error" },

  // learning theories
  { id: 19, cat: "learning-theories", name: "Classical conditioning", seed: "classical conditioning" },
  { id: 20, cat: "learning-theories", name: "Operant conditioning", seed: "operant conditioning reinforcement" },
  { id: 21, cat: "learning-theories", name: "Observational learning", seed: "observational learning Bandura" },
  { id: 22, cat: "learning-theories", name: "Cognitive load theory", seed: "cognitive load theory learning" },
  { id: 23, cat: "learning-theories", name: "Zone of proximal development", seed: "zone of proximal development Vygotsky" },
  { id: 24, cat: "learning-theories", name: "Spaced repetition and the spacing effect", seed: "spacing effect memory retention" },

  // personality
  { id: 25, cat: "personality", name: "The Big Five personality traits", seed: "Big Five personality traits" },
  { id: 26, cat: "personality", name: "Narcissism", seed: "narcissism personality psychology" },
  { id: 27, cat: "personality", name: "The HEXACO model", seed: "HEXACO personality model" },
  { id: 28, cat: "personality", name: "Trait vs. state psychology", seed: "personality trait versus state" },
  { id: 29, cat: "personality", name: "Locus of control", seed: "locus of control psychology" },
  { id: 30, cat: "personality", name: "Self-determination theory", seed: "self-determination theory motivation" },

  // developmental psychology
  { id: 31, cat: "developmental-psychology", name: "Piaget's stages of cognitive development", seed: "Piaget stages cognitive development" },
  { id: 32, cat: "developmental-psychology", name: "Erikson's psychosocial stages", seed: "Erikson psychosocial development stages" },
  { id: 33, cat: "developmental-psychology", name: "Object permanence", seed: "object permanence infant cognition" },
  { id: 34, cat: "developmental-psychology", name: "Theory of mind", seed: "theory of mind development" },
  { id: 35, cat: "developmental-psychology", name: "Adolescent identity formation", seed: "adolescent identity formation" },
  { id: 36, cat: "developmental-psychology", name: "Critical periods in development", seed: "critical periods development psychology" },

  // neuroscience
  { id: 37, cat: "neuroscience", name: "Neuroplasticity", seed: "neuroplasticity brain" },
  { id: 38, cat: "neuroscience", name: "Mirror neurons", seed: "mirror neurons" },
  { id: 39, cat: "neuroscience", name: "The default mode network", seed: "default mode network brain" },
  { id: 40, cat: "neuroscience", name: "The amygdala and the fear response", seed: "amygdala fear response" },
  { id: 41, cat: "neuroscience", name: "Dopamine and reward", seed: "dopamine reward system" },
  { id: 42, cat: "neuroscience", name: "The prefrontal cortex and impulse control", seed: "prefrontal cortex impulse control" },

  // clinical psychology
  { id: 43, cat: "clinical-psychology", name: "Cognitive behavioral therapy", seed: "cognitive behavioral therapy CBT" },
  { id: 44, cat: "clinical-psychology", name: "Exposure therapy", seed: "exposure therapy anxiety" },
  { id: 45, cat: "clinical-psychology", name: "Generalized anxiety disorder", seed: "generalized anxiety disorder" },
  { id: 46, cat: "clinical-psychology", name: "Major depressive disorder", seed: "major depressive disorder" },
  { id: 47, cat: "clinical-psychology", name: "PTSD and the trauma response", seed: "PTSD trauma response" },
  { id: 48, cat: "clinical-psychology", name: "Dialectical behavior therapy", seed: "dialectical behavior therapy DBT" },

  // research methods
  { id: 49, cat: "research-methods", name: "The placebo effect", seed: "placebo effect" },
  { id: 50, cat: "research-methods", name: "The replication crisis", seed: "replication crisis psychology" },
  { id: 51, cat: "research-methods", name: "Correlation vs. causation", seed: "correlation causation psychology research" },
  { id: 52, cat: "research-methods", name: "Double-blind studies", seed: "double-blind study design" },
  { id: 53, cat: "research-methods", name: "Sampling bias", seed: "sampling bias psychology research" },
  { id: 54, cat: "research-methods", name: "Publication bias", seed: "publication bias psychology" },
];

export function topicsFor(catKey) {
  return catKey === "all" ? TOPICS : TOPICS.filter((t) => t.cat === catKey);
}
