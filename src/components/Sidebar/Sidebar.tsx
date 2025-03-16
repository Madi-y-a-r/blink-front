"use client";

import * as Collapsible from "@radix-ui/react-collapsible";
import * as Tooltip from "@radix-ui/react-tooltip";
import { useEffect, useState } from "react";
import { Square, ChevronLeft, ChevronRight, Clock, Users, Plus, CalendarDays, RocketIcon, Bell } from "lucide-react";
import styles from "./Sidebar.module.scss";
import { AvatarIcon } from "@radix-ui/react-icons";
import { Icon } from "@iconify/react/dist/iconify.js";
export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setActiveSection(null);
    }
  }, [open]); 
  const toggleSection = (section: string) => {
    if (activeSection === section) {
      setActiveSection(null);
    } else {
      setActiveSection(section);
      setOpen(true); 
    }
  };

  return (
    <Collapsible.Root open={open} onOpenChange={setOpen} className={styles.sidebar}>
      <header className={styles.header}>
        <Collapsible.Trigger className={styles.toggleButton}>
          {open ? <ChevronRight /> : <ChevronLeft />}
        </Collapsible.Trigger>
        {open ? <>
          <button className={styles.tryPro}>
          <Icon icon="carbon:rocket" fontSize={20}/>
          <p>Try Blick Pro</p>
        </button>
        <div className={styles.bell}>
          <div className={styles.circle}>
            <Bell className={styles.icon} />
          </div>
          <div className={styles.badge} />
        </div>
        <AvatarIcon width={40} height={40}/>
        </> : null}
        
      </header>
      <main className={styles.content}>
        {activeSection && (
          <div className={styles.sectionContent}>
            {activeSection === 'meetings' && (
              <div className={styles.meetings}>
                <h3>Upcoming meetings</h3>
                <div className={styles.meetingList}>
                  <div className={styles.meetingItem}>
                    <div className={styles.meetingTime}>10:00</div>
                    <div className={styles.meetingInfo}>
                      <div className={styles.meetingTitle}>Daily Standup</div>
                      <div className={styles.meetingParticipants}>Team Alpha</div>
                    </div>
                  </div>
                  <div className={styles.meetingItem}>
                    <div className={styles.meetingTime}>13:30</div>
                    <div className={styles.meetingInfo}>
                      <div className={styles.meetingTitle}>Project Review</div>
                      <div className={styles.meetingParticipants}>Product Team</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeSection === 'summaries' && (
              <div className={styles.summaries}>
                <h3>Call Summaries</h3>
                <div className={styles.summaryList}>
                  <div className={styles.summaryItem}>
                    <div className={styles.summaryTitle}>Client meeting - Project Alpha</div>
                    <div className={styles.summaryTime}>Today, 9:30 AM</div>
                  </div>
                  <div className={styles.summaryItem}>
                    <div className={styles.summaryTitle}>Team Sync - Sprint Planning</div>
                    <div className={styles.summaryTime}>Yesterday, 2:00 PM</div>
                  </div>
                </div>
              </div>
            )}
            
            {activeSection === 'createMeeting' && (
              <div className={styles.createMeeting}>
                <h3>Create Meeting</h3>
                <form className={styles.meetingForm}>
                  <input type="text" placeholder="Meeting title" />
                  <input type="text" placeholder="Date and time" />
                  <input type="text" placeholder="Participants" />
                  <button type="submit">Create</button>
                </form>
              </div>
            )}
            
            {activeSection === 'calendar' && (
              <div className={styles.calendar}>
                <h3>My Calendar</h3>
                <div className={styles.miniCalendar}>
                  <div className={styles.calendarHeader}>March 2025</div>
                  <div className={styles.calendarGrid}>
                    
                    {Array.from({ length: 31 }, (_, i) => (
                      <div key={i} className={styles.calendarDay}>
                        {i + 1}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {activeSection === 'team' && (
              <div className={styles.team}>
                <h3>My Team</h3>
                <div className={styles.teamList}>
                  <div className={styles.teamMember}>
                    <div className={styles.memberAvatar}></div>
                    <div className={styles.memberName}>Александр К.</div>
                  </div>
                  <div className={styles.teamMember}>
                    <div className={styles.memberAvatar}></div>
                    <div className={styles.memberName}>Елена М.</div>
                  </div>
                  <div className={styles.teamMember}>
                    <div className={styles.memberAvatar}></div>
                    <div className={styles.memberName}>Иван П.</div>
                  </div>
                </div>
              </div>
            )}
            
            {activeSection === 'invite' && (
              <div className={styles.invite}>
                <h3>Invite Teammates</h3>
                <div className={styles.inviteForm}>
                  <input type="email" placeholder="Email address" />
                  <button>Send Invite</button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <footer className={styles.bottomTools}>
        <div className={styles.toolRow}>
          <Tooltip.Provider>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <button 
                  className={`${styles.toolButton} ${activeSection === 'meetings' ? styles.active : ''}`}
                  onClick={() => toggleSection('meetings')}
                >
                  <Icon icon="mdi:clipboard-clock-outline" fontSize={20}/>
                  {open && <span>Upcoming meetings</span>}
                </button>
              </Tooltip.Trigger>
              <Tooltip.Content className={styles.tooltip} side="right">
                Upcoming meetings
              </Tooltip.Content>
            </Tooltip.Root>
          </Tooltip.Provider>

          <Tooltip.Provider>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <button 
                  className={`${styles.toolButton} ${activeSection === 'summaries' ? styles.active : ''}`}
                  onClick={() => toggleSection('summaries')}
                >
                  <Icon icon="solar:phone-linear" fontSize={20}/>
                  {open && <span>Call Summaries</span>}
                </button>
              </Tooltip.Trigger>
              <Tooltip.Content className={styles.tooltip} side="right">
                Call Summaries
              </Tooltip.Content>
            </Tooltip.Root>
          </Tooltip.Provider>
        </div>

        <div className={styles.toolRow}>
          <Tooltip.Provider>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <button 
                  className={`${styles.toolButton} ${activeSection === 'createMeeting' ? styles.active : ''}`}
                  onClick={() => toggleSection('createMeeting')}
                >
                  <Icon icon="lucide:plus" fontSize={20}/>
                  {open && <span>Create meeting</span>}
                </button>
              </Tooltip.Trigger>
              <Tooltip.Content className={styles.tooltip} side="right">
                Create meeting
              </Tooltip.Content>
            </Tooltip.Root>
          </Tooltip.Provider>

          <Tooltip.Provider>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <button 
                  className={`${styles.toolButton} ${activeSection === 'calendar' ? styles.active : ''}`}
                  onClick={() => toggleSection('calendar')}
                >
                  <Icon icon="meteor-icons:calendar" fontSize={20}/>
                  {open && <span>My Calendar</span>}
                </button>
              </Tooltip.Trigger>
              <Tooltip.Content className={styles.tooltip} side="right">
                My Calendar
              </Tooltip.Content>
            </Tooltip.Root>
          </Tooltip.Provider>
        </div>

        <div className={styles.toolRow}>
          <Tooltip.Provider>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <button 
                  className={`${styles.toolButton} ${activeSection === 'team' ? styles.active : ''}`}
                  onClick={() => toggleSection('team')}
                >
                  <Icon icon="fluent:people-team-16-regular" fontSize={20}/>
                  {open && <span>My Team</span>}
                </button>
              </Tooltip.Trigger>
              <Tooltip.Content className={styles.tooltip} side="right">
                My Team
              </Tooltip.Content>
            </Tooltip.Root>
          </Tooltip.Provider>

          <Tooltip.Provider>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <button 
                  className={`${styles.toolButton} ${activeSection === 'invite' ? styles.active : ''}`}
                  onClick={() => toggleSection('invite')}
                >
                  <Icon icon="fluent:share-16-regular" fontSize={20}/>
                  {open && <span>Invite</span>}
                </button>
              </Tooltip.Trigger>
              <Tooltip.Content className={styles.tooltip} side="right">
                Invite
              </Tooltip.Content>
            </Tooltip.Root>
          </Tooltip.Provider>
        </div>
      </footer>
    </Collapsible.Root>
  );
}