import React from 'react';

export type BodySystemRegion = 'ALL' | 'HEAD' | 'CHEST' | 'ABDOMEN' | 'LIMBS' | 'GENERAL';

export interface BodyMapProps {
  activeRegion: BodySystemRegion;
  onSelectRegion: (region: BodySystemRegion) => void;
  selectedSymptomIds: string[];
}

export const BODY_REGION_SYMPTOMS: Record<Exclude<BodySystemRegion, 'ALL'>, string[]> = {
  HEAD: ['headache', 'dizziness', 'sore_throat'],
  CHEST: ['cough', 'breathlessness', 'chest_pain'],
  ABDOMEN: ['vomiting', 'abdominal_pain', 'diarrhea'],
  LIMBS: ['body_ache', 'joint_pain', 'fatigue'],
  GENERAL: ['fever', 'chills', 'rash', 'fatigue', 'body_ache'],
};

export const BODY_REGION_LABELS: Record<
  BodySystemRegion,
  { title: string; bilingual: string; description: string }
> = {
  ALL: {
    title: 'All Body Systems',
    bilingual: 'सर्व शारीरिक लक्षणे',
    description: 'Showing all 15 primary rural clinical screening symptoms',
  },
  HEAD: {
    title: 'Head, Neuro & ENT',
    bilingual: 'डोके, घसा आणि चक्कर',
    description: 'Headache, Dizziness, Sore Throat',
  },
  CHEST: {
    title: 'Chest & Cardio-Respiratory',
    bilingual: 'छाती, खोकला आणि श्वसन',
    description: 'Cough, Breathlessness, Chest Pain',
  },
  ABDOMEN: {
    title: 'Abdomen & Digestive',
    bilingual: 'पोटदुखी, मळमळ आणि जुलाब',
    description: 'Abdominal Pain, Vomiting, Diarrhea',
  },
  LIMBS: {
    title: 'Muscles, Joints & Limbs',
    bilingual: 'सांधेदुखी आणि अंगदुखी',
    description: 'Joint Pain, Body Ache, Weakness',
  },
  GENERAL: {
    title: 'Systemic, Fever & Skin',
    bilingual: 'ताप, थंडी आणि त्वचा',
    description: 'Fever, Chills, Skin Rash, Fatigue',
  },
};

export const BodyMap: React.FC<BodyMapProps> = ({
  activeRegion,
  onSelectRegion,
  selectedSymptomIds,
}) => {
  const countRegionMatches = (region: Exclude<BodySystemRegion, 'ALL'>) => {
    const ids = BODY_REGION_SYMPTOMS[region];
    return selectedSymptomIds.filter((id) => ids.includes(id)).length;
  };

  const getRegionFill = (region: Exclude<BodySystemRegion, 'ALL'>) => {
    const isSelected = activeRegion === region;
    const count = countRegionMatches(region);
    if (isSelected) return '#0d9488';
    if (count > 0) return '#f59e0b';
    return '#cbd5e1';
  };

  const getRegionStroke = (region: Exclude<BodySystemRegion, 'ALL'>) => {
    const isSelected = activeRegion === region;
    const count = countRegionMatches(region);
    if (isSelected) return '#115e59';
    if (count > 0) return '#b45309';
    return '#64748b';
  };

  return (
    <div className="body-map-container">
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '0.6rem',
          flexWrap: 'wrap',
          gap: '0.4rem',
        }}
      >
        <div>
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 800,
              color: 'var(--primary)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              display: 'block',
            }}
          >
            Interactive Anatomical Filter
          </span>
          <strong style={{ fontSize: '0.95rem', color: 'var(--text-main)' }}>
            {BODY_REGION_LABELS[activeRegion].title} ({BODY_REGION_LABELS[activeRegion].bilingual})
          </strong>
        </div>

        {activeRegion !== 'ALL' && (
          <button
            type="button"
            onClick={() => onSelectRegion('ALL')}
            style={{
              padding: '0.25rem 0.65rem',
              borderRadius: '9999px',
              fontSize: '0.75rem',
              fontWeight: 700,
              backgroundColor: '#ffffff',
              border: '1px solid var(--border-medium)',
              color: 'var(--text-main)',
              cursor: 'pointer',
            }}
          >
            Show All (सर्व दाखवा)
          </button>
        )}
      </div>

      {/* Interactive Anatomical SVG + Region Pills */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '150px 1fr',
          gap: '1rem',
          alignItems: 'center',
          width: '100%',
        }}
      >
        {/* Human Silhouette SVG */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <svg
            width="135"
            height="230"
            viewBox="0 0 140 240"
            role="img"
            aria-label="Interactive human body system selector"
          >
            {/* Systemic Aura Ring */}
            <circle
              cx="70"
              cy="115"
              r="64"
              fill="none"
              stroke={activeRegion === 'GENERAL' ? '#0d9488' : '#e2e8f0'}
              strokeWidth="2.5"
              strokeDasharray="5 4"
            />

            {/* HEAD & NECK */}
            <g
              className="body-region-svg"
              onClick={() => onSelectRegion(activeRegion === 'HEAD' ? 'ALL' : 'HEAD')}
            >
              <title>Head, Neuro & ENT (डोके व घसा)</title>
              <circle
                cx="70"
                cy="30"
                r="20"
                fill={getRegionFill('HEAD')}
                stroke={getRegionStroke('HEAD')}
                strokeWidth="2.5"
              />
              <rect
                x="63"
                y="50"
                width="14"
                height="10"
                rx="4"
                fill={getRegionFill('HEAD')}
                stroke={getRegionStroke('HEAD')}
                strokeWidth="2"
              />
            </g>

            {/* CHEST / THORAX */}
            <g
              className="body-region-svg"
              onClick={() => onSelectRegion(activeRegion === 'CHEST' ? 'ALL' : 'CHEST')}
            >
              <title>Chest & Respiratory (छाती व श्वसन)</title>
              <path
                d="M 44 62 Q 70 58 96 62 L 92 104 L 48 104 Z"
                fill={getRegionFill('CHEST')}
                stroke={getRegionStroke('CHEST')}
                strokeWidth="2.5"
              />
            </g>

            {/* ABDOMEN / GI */}
            <g
              className="body-region-svg"
              onClick={() => onSelectRegion(activeRegion === 'ABDOMEN' ? 'ALL' : 'ABDOMEN')}
            >
              <title>Abdomen & Digestive (पोट व पचन)</title>
              <path
                d="M 48 106 L 92 106 L 88 144 Q 70 150 52 144 Z"
                fill={getRegionFill('ABDOMEN')}
                stroke={getRegionStroke('ABDOMEN')}
                strokeWidth="2.5"
              />
            </g>

            {/* LIMBS (ARMS & LEGS) */}
            <g
              className="body-region-svg"
              onClick={() => onSelectRegion(activeRegion === 'LIMBS' ? 'ALL' : 'LIMBS')}
            >
              <title>Arms, Legs & Joints (हातापायांचे सांधे)</title>
              {/* Left Arm */}
              <rect
                x="25"
                y="64"
                width="15"
                height="68"
                rx="7"
                fill={getRegionFill('LIMBS')}
                stroke={getRegionStroke('LIMBS')}
                strokeWidth="2"
              />
              {/* Right Arm */}
              <rect
                x="100"
                y="64"
                width="15"
                height="68"
                rx="7"
                fill={getRegionFill('LIMBS')}
                stroke={getRegionStroke('LIMBS')}
                strokeWidth="2"
              />
              {/* Left Leg */}
              <rect
                x="50"
                y="148"
                width="17"
                height="80"
                rx="8"
                fill={getRegionFill('LIMBS')}
                stroke={getRegionStroke('LIMBS')}
                strokeWidth="2"
              />
              {/* Right Leg */}
              <rect
                x="73"
                y="148"
                width="17"
                height="80"
                rx="8"
                fill={getRegionFill('LIMBS')}
                stroke={getRegionStroke('LIMBS')}
                strokeWidth="2"
              />
            </g>
          </svg>
        </div>

        {/* Region Filter Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
          {(['ALL', 'HEAD', 'CHEST', 'ABDOMEN', 'LIMBS', 'GENERAL'] as BodySystemRegion[]).map(
            (region) => {
              const isSelected = activeRegion === region;
              const matchCount =
                region === 'ALL'
                  ? selectedSymptomIds.length
                  : countRegionMatches(region);

              return (
                <button
                  key={region}
                  type="button"
                  onClick={() => onSelectRegion(region)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.48rem 0.75rem',
                    borderRadius: 'var(--radius-md)',
                    border: isSelected
                      ? '2px solid var(--primary)'
                      : '1px solid var(--border-light)',
                    backgroundColor: isSelected ? 'var(--primary-light)' : '#ffffff',
                    color: isSelected ? 'var(--primary-hover)' : 'var(--text-main)',
                    fontWeight: isSelected ? 800 : 600,
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div>
                    <div>{BODY_REGION_LABELS[region].title}</div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-subtle)' }}>
                      {BODY_REGION_LABELS[region].bilingual}
                    </div>
                  </div>
                  {matchCount > 0 && (
                    <span
                      style={{
                        padding: '0.1rem 0.45rem',
                        borderRadius: '9999px',
                        fontSize: '0.7rem',
                        fontWeight: 800,
                        backgroundColor: isSelected ? 'var(--primary)' : '#fef3c7',
                        color: isSelected ? '#ffffff' : '#92400e',
                      }}
                    >
                      {matchCount}
                    </span>
                  )}
                </button>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
};
