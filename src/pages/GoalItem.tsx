import GoalHeader from "../components/layout/Goal/GoalHeader/GoalHeader";
import { Separator } from "../components/ui/Separator/separator";
import { useState } from "react";
import GoalDescription from "../components/layout/Goal/GoalDescription/GoalDescription";
import GoalTasks from "../components/layout/Goal/GoalTasks/GoalTasks";
import GoalNotes from "../components/layout/Goal/GoalNotes/GoalNotes";

export default function GoalItem() {
  const [activeTab, setActiveTab] = useState<string>("Description");

  const setTab = (e: string) => {
    setActiveTab(e);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Description":
        return <GoalDescription />;
      case "Tasks":
        return <GoalTasks />;
      case "Notes":
        return <GoalNotes />;
      default:
        return <GoalDescription />;
    }
  };

  return (
    <div className='min-h-screen w-screen max-w-[400px] py-5 px-6 text-[#494949] relative'>
      <GoalHeader
        activeTab={activeTab}
        setTab={setTab}
      />
      <Separator />
      {renderContent()}
    </div>
  );
}
