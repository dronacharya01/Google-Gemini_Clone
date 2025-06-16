import React, { useState } from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';

const Sidebar = ({ prevPrompts, onClear, onSelectPrompt }) => {
  const [extended, setExtended] = useState(false);

  return (
    <div className='sidebar'>
      <div className="top">
        <img
          onClick={() => setExtended(prev => !prev)}
          className='menu'
          src={assets.menu_icon}
          alt="menu"
        />
        <div className="new-chat" onClick={onClear}>
          <img src={assets.plus_icon} alt="new chat" />
          {extended && <p>New Chat</p>}
        </div>

        {extended && (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.length > 0 ? (
              prevPrompts.map((item, index) => (
                <div
                  key={index}
                  className="recent-entry"
                  onClick={() => onSelectPrompt(item.prompt)}
                >
                  <img src={assets.message_icon} alt="msg" />
                  <p>{item.prompt.length > 18 ? item.prompt.slice(0, 18) + '...' : item.prompt}</p>
                </div>
              ))
            ) : (
              <p className="no-history">No recent prompts</p>
            )}
          </div>
        )}
      </div>

      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="help" />
          {extended && <p>Help</p>}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="activity" />
          {extended && <p>Activity</p>}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="settings" />
          {extended && <p>Settings</p>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
