# Resume Builder - Architecture & Flow Diagrams

## 🏗️ Component Architecture

```
┌─────────────────────────────────────────────────────┐
│              PrepResume (Main Page)                 │
│           State: resumeData, activeTab              │
└────────────────┬────────────────────────────────────┘
                 │
        ┌────────┼────────┐
        │        │        │
        ▼        ▼        ▼
   ┌─────────┐ ┌──────────────┐ ┌──────────────┐
   │Templates │ │ResumeBuilder │ │ ATSChecker   │
   │  (Tab 1) │ │   (Tab 2)    │ │  (Tab 3)     │
   └────┬────┘ └──────┬───────┘ └──────┬───────┘
        │            │               │
        │            ▼               ▼
        │      ┌──────────────┐  ┌────────────┐
        │      │Form Section  │  │Score Card  │
        │      │+ Preview     │  │Feedback    │
        │      └──────────────┘  │Suggestions │
        │                        │Tips        │
        │                        │Keywords    │
        └─────────────────────────────────────────┘
```

---

## 🔄 Data Flow Diagram

```
┌──────────────────────┐
│  User Input (Form)   │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ Handle Change Event  │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────────────┐
│ Update resumeData State      │
│ - personalInfo               │
│ - experience                 │
│ - education                  │
│ - skills                     │
│ - projects                   │
└──────────┬───────────────────┘
           │
     ┌─────┴─────┐
     │           │
     ▼           ▼
┌─────────┐ ┌──────────────┐
│Preview  │ │ATS Checker   │
│Updates  │ │Recalculates  │
└─────────┘ └──────────────┘
     │           │
     └─────┬─────┘
           ▼
    ┌─────────────┐
    │User Sees    │
    │Updates      │
    └─────────────┘
```

---

## 📋 Resume Builder Form Structure

```
ResumeBuilder Component
│
├── Collapsible Section: Personal Information
│   ├── Full Name (text input) *
│   ├── Email (email input) *
│   ├── Phone (tel input) *
│   ├── Location (text input)
│   └── Summary (textarea)
│
├── Collapsible Section: Work Experience
│   ├── [Add Button]
│   │
│   ├── Entry Card #1
│   │   ├── Job Title (text)
│   │   ├── Company (text)
│   │   ├── Location (text)
│   │   ├── Start Date (month)
│   │   ├── End Date (month)
│   │   ├── Currently Working (checkbox)
│   │   ├── Description (textarea)
│   │   └── [Delete Button]
│   │
│   ├── Entry Card #2
│   │   └── ...
│   │
│   └── [Add More Button]
│
├── Collapsible Section: Education
│   ├── [Add Button]
│   ├── Entry Cards (similar structure)
│   └── [Add More Button]
│
├── Collapsible Section: Skills
│   ├── [Add Button]
│   ├── Skill Items (Skill Name + Proficiency)
│   └── [Add More Button]
│
└── Collapsible Section: Projects
    ├── [Add Button]
    ├── Project Cards (Name, Description, Tech, Link, Date)
    └── [Add More Button]
```

---

## 🎨 ATS Scoring Algorithm Flow

```
Resume Data Input
│
├─ Calculate Section Scores
│  │
│  ├─ Personal Info Section (15 pts)
│  │  ├─ Full Name? (5 pts)
│  │  ├─ Email? (5 pts)
│  │  └─ Phone? (5 pts)
│  │
│  ├─ Summary Section (10 pts)
│  │  └─ Summary > 50 words? (10 pts)
│  │
│  ├─ Experience Section (20 pts)
│  │  ├─ Has experience? (10 pts)
│  │  └─ Valid entries? (10 pts)
│  │
│  ├─ Education Section (15 pts)
│  │  ├─ Has education? (10 pts)
│  │  └─ Valid entries? (5 pts)
│  │
│  ├─ Skills Section (20 pts)
│  │  ├─ Has skills? (10 pts)
│  │  ├─ 5+ skills? (5 pts)
│  │  └─ 10+ skills? (5 pts)
│  │
│  ├─ Projects Section (10 pts)
│  │  └─ Projects × 3 pts (max 10)
│  │
│  └─ Keywords Section (10 pts)
│     └─ Action verbs & keywords
│
├─ Sum All Section Scores
│
├─ Cap at 100
│
└─ Return Final Score (0-100)
```

---

## 📊 ATS Score Categories

```
Score Range     │ Category    │ Color  │ Recommendation
─────────────────────────────────────────────────────────
80 - 100       │ Excellent ✅ │ Green  │ Ready to submit
60 - 79        │ Good 👍     │ Orange │ Good, minor improvements
40 - 59        │ Fair ⚠️     │ Yellow │ Follow suggestions
0 - 39         │ Poor ❌     │ Red    │ Major improvements needed
```

---

## 🎯 User Journey - Complete Flow

```
START
  │
  ▼
Visit /prepare-resume
  │
  ▼
┌────────────────────────────┐
│ See Resume Templates Tab   │
│ (DEFAULT)                  │
└────┬───────────────────────┘
     │
     ▼
┌──────────────────────┐      ┌──────────────────────┐
│ Click Template Card  │─────▶│ Tab Updates to       │
└──────────────────────┘      │ Build Resume         │
     │                        └──────────────────────┘
     │
     ▼
┌─────────────────────────┐
│ Fill Personal Info      │
│ (Name, Email, Phone)    │
└──────┬──────────────────┘
       │
       ▼
┌──────────────────────┐
│ See Preview Update   │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│ Add Work Experience  │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│ Add Education        │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│ Add Skills           │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│ Add Projects         │
└──────┬───────────────┘
       │
       ▼
┌─────────────────────────────┐
│ Click ATS Score Tab         │
└──────┬──────────────────────┘
       │
       ▼
┌────────────────────────┐
│ View ATS Score (0-100) │
└──────┬─────────────────┘
       │
       ▼
┌────────────────────────┐
│ Read Feedback & Tips   │
└──────┬─────────────────┘
       │
       ▼
┌────────────────────────┐
│ Make Improvements      │
└──────┬─────────────────┘
       │
       ▼
┌────────────────────────┐
│ Check Score Again      │
│ (It improved! ✅)      │
└──────┬─────────────────┘
       │
       ▼
┌────────────────────────┐
│ Download Resume (PDF)  │
│ [Feature Ready]        │
└──────┬─────────────────┘
       │
       ▼
    END
```

---

## 🗂️ File Organization

```
frontend/
├── src/
│   ├── App.js (Updated)
│   │   └── Added: import PrepResume
│   │   └── Added: route /prepare-resume
│   │
│   ├── pages/
│   │   ├── PrepResume.jsx (NEW) ⭐
│   │   │   └── Main orchestration component
│   │   │
│   │   └── style.css (Updated)
│   │       └── Added: 800+ lines for resume builder
│   │
│   └── components/
│       ├── ResumeTemplates.jsx (NEW) ⭐
│       │   └── Template selection component
│       │
│       ├── ResumeBuilder.jsx (NEW) ⭐
│       │   └── Form and preview component
│       │
│       ├── ATSChecker.jsx (NEW) ⭐
│       │   └── ATS scoring component
│       │
│       └── RESUME_BUILDER_GUIDE.md (NEW)
│           └── Feature documentation
│
├── RESUME_BUILDER_SETUP.md ⭐
├── RESUME_BUILDER_COMPLETE.md ⭐
├── SAMPLE_RESUME_DATA.md ⭐
└── QUICK_REFERENCE.md ⭐
```

---

## 🔀 State Tree

```
resumeData (State)
│
├── personalInfo
│   ├── fullName: string
│   ├── email: string
│   ├── phone: string
│   ├── location: string
│   └── summary: string
│
├── experience: Array[
│   ├── id: number (timestamp)
│   ├── jobTitle: string
│   ├── company: string
│   ├── location: string
│   ├── startDate: string (YYYY-MM)
│   ├── endDate: string (YYYY-MM)
│   ├── currentlyWorking: boolean
│   └── description: string
│ ]
│
├── education: Array[
│   ├── id: number
│   ├── degree: string
│   ├── institution: string
│   ├── field: string
│   ├── startDate: string
│   ├── endDate: string
│   ├── grade: string
│   └── description: string
│ ]
│
├── skills: Array[
│   ├── id: number
│   ├── skill: string
│   └── proficiency: string (Beginner|Intermediate|Advanced|Expert)
│ ]
│
└── projects: Array[
    ├── id: number
    ├── projectName: string
    ├── description: string
    ├── technologies: string
    ├── link: string
    └── date: string (YYYY-MM)
  ]
```

---

## 🎨 CSS Class Hierarchy

```
.prep-resume-container
│
├── .resume-page-header
│
├── .resume-tabs
│   ├── .tab-button
│   │   ├── .tab-button:hover
│   │   └── .tab-button.active
│   └── ...
│
└── .resume-content
    ├── .templates-section
    │   ├── .templates-intro
    │   └── .templates-grid
    │       └── .template-card
    │
    ├── .resume-builder-container
    │   └── .builder-content
    │       ├── .form-section
    │       │   ├── .section-header
    │       │   │   ├── .section-header h3
    │       │   │   └── .toggle-icon
    │       │   └── .section-content
    │       │       ├── .form-group
    │       │       ├── .form-row
    │       │       ├── .entry-card
    │       │       └── .add-btn
    │       │
    │       └── .preview-section
    │           ├── .preview-header
    │           ├── .download-btn
    │           ├── .resume-preview
    │           └── .preview-content
    │
    └── .ats-checker-container
        ├── .ats-header
        ├── .ats-content
        │   ├── .score-card
        │   │   ├── .score-circle
        │   │   └── .score-bar
        │   │
        │   ├── .feedback-section
        │   │   └── .feedback-item
        │   │
        │   ├── .suggestions-section
        │   │   └── .suggestion-item
        │   │
        │   ├── .tips-section
        │   │   └── .tips-grid
        │   │       └── .tip-card
        │   │
        │   └── .keywords-section
        │       └── .keyword-group
        │           └── .keyword
```

---

## 🔄 Event Flow - Add Skill Example

```
User clicks "+ Add Skill" button
        │
        ▼
onClick handler triggers
        │
        ▼
handleAddSkill() called
        │
        ▼
New skill object created:
{
  id: Date.now(),
  skill: "",
  proficiency: "Intermediate"
}
        │
        ▼
skills array updated
        │
        ▼
resumeData state updated
        │
        ▼
Component re-renders
        │
        ▼
New skill input appears in UI
        │
        ▼
User types skill name
        │
        ▼
onChange fires
        │
        ▼
handleUpdateSkill() called
        │
        ▼
State updates
        │
        ▼
Preview updates
        │
        ▼
ATS score recalculates
        │
        ▼
User sees updated score
```

---

## 📈 Performance Optimization

```
Rendering Strategy:
│
├── State updates in PrepResume
│   └── Prop drilling to children
│
├── Callback functions for updates
│   └── onDataChange callback
│
├── Collapsible sections
│   └── Reduce DOM nodes visible
│
├── Lazy calculations
│   └── ATS score on demand
│
└── CSS optimizations
    ├── CSS Grid/Flexbox
    ├── Transform animations
    └── GPU acceleration
```

---

## 🚀 Deployment Architecture

```
GitHub (Source Control)
    │
    ▼
Build Process
    │
    ├─ Lint check
    ├─ Compile JSX
    ├─ Bundle CSS
    └─ Minify assets
    │
    ▼
Frontend (Deployed)
    │
    ├─ HTML (index.html)
    ├─ React Bundle
    ├─ CSS Bundle
    └─ Assets
    │
    ▼
User Browser
    │
    └─ Resume Builder loads at /prepare-resume
```

---

**Diagram Version:** 1.0
**Last Updated:** January 2026
**Status:** ✅ Complete
