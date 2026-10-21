import { LuBriefcase, LuCodeXml, LuDatabase, LuGraduationCap, LuPanelsTopLeft, LuSearch, LuServer, LuWrench } from "react-icons/lu";

const ICONS = {
  code: LuCodeXml,
  server: LuServer,
  layout: LuPanelsTopLeft,
  search: LuSearch,
  database: LuDatabase,
  wrench: LuWrench,
  briefcase: LuBriefcase,
  graduation: LuGraduationCap,
};

export type IconName = keyof typeof ICONS;

/** Icon inside the tinted square used on service and skill cards */
export default function IconBadge({ name }: { name: IconName }) {
  const Icon = ICONS[name];

  return (
    <span className="grid size-10 shrink-0 place-items-center bg-icon-bg text-icon-fg">
      <Icon className="size-4.5" aria-hidden="true" />
    </span>
  );
}
