import React from 'react';

const path = '/badges/achievement-collection.png';

function CourseCard({ name = 'JavaScript', meta = '36 leçons · Débutant', progress = 72, color = '#F7C948' }) {
  return <article className="course-card"><div className="course-icon" style={{ background: color }}>{name.slice(0, 2)}</div><div className="course-body"><strong>{name}</strong><span>{meta}</span><div className="track"><i style={{ width: `${progress}%`, background: color }} /></div><small>{progress}% terminé</small></div><b>›</b></article>;
}
function BadgeCollection() { return <section className="badge-card"><p className="eyebrow">RÉCOMPENSES</p><h2>Collection de badges</h2><img src={path} alt="Badges de progression CodeLearn" /><div className="badge-copy"><span>Foudre quotidienne</span><span>Défi gagné</span></div></section>; }
function ChallengeCard({ answered = false }) { return <section className="challenge-card"><div className="live">● DÉFI DU JOUR</div><h2>Quel code HTTP signale une création réussie ?</h2><button className={answered ? 'right' : ''}>201 Created</button><button>200 OK</button><button>304 Not modified</button>{answered && <p className="success">Correct ! +120 XP · Révision espacée dans 2 jours.</p>}</section>; }

export default { title: 'CodeLearn/Apprentissage' };
export const Cours = { render: () => <CourseCard /> };
export const BadgeIllustre = { render: () => <BadgeCollection /> };
export const DefiPedagogique = { render: () => <ChallengeCard answered /> };
