"use client";

import React from "react";
import { useState } from "react";

function page() {
  const [sections, setSections] = useState([]);
  const [sectionName, setSectionName] = useState("");
  const [sectionDescription, setSectionDescription] = useState("");
  const [sectionCapacity, setSectionCapacity] = useState(0);
  const [sectionTeacher, setSectionTeacher] = useState("");

  const handleAddSection = () => {
    setSections([...sections, { name: sectionName, description: sectionDescription, capacity: sectionCapacity, teacher: sectionTeacher }]);
  };

  
  
  return (
    <div>
      <h1>Manage Sections</h1>
      <input
        type="text"
        value={sectionName}
        onChange={(e) => setSectionName(e.target.value)}
      />
      <input
        type="text"
        value={sectionDescription}
        onChange={(e) => setSectionDescription(e.target.value)}
      />
      
      
    </div>
  );
}


export default page;
