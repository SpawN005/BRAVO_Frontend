import React from 'react'

export default function MatchInfoComponent({ infoItems }) {
    
  return (
    <div style={{ height: '64px', borderTop: '0.8px solid rgb(245, 245, 245)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <section>
      <ul style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', listStyle: 'none', padding: '0', margin: '0' }}>
        {infoItems.map(item => (
          <MatchInfoItem key={item.id} iconSvg={item.iconSvg} text={item.text} />
        ))}
      </ul>
    </section>
  </div>
  )
}

const MatchInfoItem = ({ iconSvg, text }) => (
    <li style={{ display: 'flex', alignItems: 'center', color: 'rgb(113, 113, 113)' }}>
      <div style={{ display: 'flex', alignItems: 'center', fontSize: '14px', lineHeight: '16px', marginRight: '20px' }}>
        <svg style={{ marginRight: '5px', width: '18px', height: '18px' }} dangerouslySetInnerHTML={{ __html: iconSvg }} />
        <span>{text}</span>
      </div>
    </li>
  );
  
