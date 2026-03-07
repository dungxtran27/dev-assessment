import { RegisterStudents } from "../components/RegisterStudents";
import { CommonStudents } from "../components/CommonStudents";
import { SuspendStudent } from "../components/SuspendStudent";
import { NotificationRecipients } from "../components/NotificationRecipients";

export const HomePage = () => {
  return (
    <section className="grid gap-5 lg:grid-cols-2">
      <RegisterStudents />
      <CommonStudents />
      <SuspendStudent />
      <NotificationRecipients />
    </section>
  );
};
