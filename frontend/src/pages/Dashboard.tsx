

// import { useEffect, useState } from "react";
// import {
//     FolderKanban,
//     FolderOpen,
//     CheckCircle2,
//     Clock3,
//     ListTodo,
//     CircleDashed,
// } from "lucide-react";

// import api from "../services/api";
// import MainLayout from "../layouts/MainLayout";

// import DashboardHeader from "../components/dashboard/DashboardHeader";
// import StatCard from "../components/dashboard/StatCard";
// import StatCardSkeleton from "../components/dashboard/StatCardSkeleton";
// import ProductivityChart from "../components/dashboard/ProductivityChart";
// import TaskStatusChart from "../components/dashboard/TaskStatusChart";
// import QuickActions from "../components/dashboard/QuickActions";
// import RecentProjects from "../components/dashboard/RecentProjects";
// import RecentActivity from "../components/dashboard/RecentActivity";
// import CalendarWidget from "../components/dashboard/CalendarWidget";
// import UpcomingDeadlines from "../components/dashboard/UpcomingDeadlines";


// import type {
//     DashboardStats,
//     RecentProject,
//     Activity,
//     WeeklyProductivity,
// } from "../types/dashboard";

// const Dashboard = () => {
//     const [loading, setLoading] = useState(true);

//     const [stats, setStats] = useState<DashboardStats>({
//         totalWorkspaces: 0,
//         totalProjects: 0,
//         totalTasks: 0,
//         completedTasks: 0,
//         inProgressTasks: 0,
//         todoTasks: 0,
//         overdueTasks: 0,
//     });
// const [upcomingDeadlines, setUpcomingDeadlines] =
//     useState<UpcomingDeadline[]>([]);
//     const [recentProjects, setRecentProjects] =
//         useState<RecentProject[]>([]);

//     const [activity, setActivity] =
//         useState<Activity[]>([]);

//     const [weeklyProductivity, setWeeklyProductivity] =
//         useState<WeeklyProductivity[]>([]);

//     useEffect(() => {
//         const fetchDashboard = async () => {
//             try {
//                 const res = await api.get("/dashboard");

//                 setStats(res.data.stats);

//                 setRecentProjects(
//                     res.data.recentProjects
//                 );

//                 setActivity(
//                     res.data.activity
//                 );

//                 setWeeklyProductivity(
//                     res.data.weeklyProductivity
//                 );
//             } catch (error) {
//                 console.log(error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchDashboard();
//     }, []);

//     return (
//         <MainLayout>

//             <div className="space-y-8">

//                 <DashboardHeader />

//                 {/* Stats */}

//                 <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

//                     {loading ? (
//                         Array.from({ length: 4 }).map(
//                             (_, index) => (
//                                 <StatCardSkeleton
//                                     key={index}
//                                 />
//                             )
//                         )
//                     ) : (
//                         <>
//                             <StatCard
//                                 title="Workspaces"
//                                 value={
//                                     stats.totalWorkspaces
//                                 }
//                                 icon={FolderKanban}
//                             />

//                             <StatCard
//                                 title="Projects"
//                                 value={
//                                     stats.totalProjects
//                                 }
//                                 icon={FolderOpen}
//                             />

//                             <StatCard
//                                 title="Tasks"
//                                 value={
//                                     stats.totalTasks
//                                 }
//                                 icon={ListTodo}
//                             />

//                             <StatCard
//                                 title="Completed"
//                                 value={
//                                     stats.completedTasks
//                                 }
//                                 icon={CheckCircle2}
//                             />
//                         </>
//                     )}

//                 </div>

//                 {/* Charts */}

//                 <div className="grid gap-6 xl:grid-cols-2">

//                     <ProductivityChart
//                         data={weeklyProductivity}
//                     />

//                     <TaskStatusChart
//                         todo={stats.todoTasks}
//                         progress={
//                             stats.inProgressTasks
//                         }
//                         done={
//                             stats.completedTasks
//                         }
//                         overdue={
//                             stats.overdueTasks
//                         }
//                     />

//                 </div>

//                 {/* Middle */}

//                 <div className="grid gap-6 lg:grid-cols-2">

//                     <RecentProjects
//                         projects={
//                             recentProjects
//                         }
//                     />

//                     {/* Calendar & Deadlines */}
//                     <div className="grid gap-6 lg:grid-cols-1">

//                         <CalendarWidget />

//                         {/* UpcomingDeadlines component goes here */}

//                     </div>

//                 </div>
           

               
//                 {/* Activity */}

//                 <RecentActivity
//                     activity={activity}
//                 />

//                 {/* Bottom */}

//                 <div className="grid gap-6 md:grid-cols-3">

//                     <StatCard
//                         title="In Progress"
//                         value={
//                             stats.inProgressTasks
//                         }
//                         icon={CircleDashed}
//                     />

//                     <StatCard
//                         title="Todo"
//                         value={stats.todoTasks}
//                         icon={ListTodo}
//                     />

//                     <StatCard
//                         title="Overdue"
//                         value={
//                             stats.overdueTasks
//                         }
//                         icon={Clock3}
//                     />

//                 </div>

//             </div>
         
//         </MainLayout>
//     );
// };

// export default Dashboard;

import { useEffect, useState } from "react";
import {
    FolderKanban,
    FolderOpen,
    CheckCircle2,
    Clock3,
    ListTodo,
    CircleDashed,
} from "lucide-react";

import api from "../services/api";
import MainLayout from "../layouts/MainLayout";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import StatCard from "../components/dashboard/StatCard";
import StatCardSkeleton from "../components/dashboard/StatCardSkeleton";
import ProductivityChart from "../components/dashboard/ProductivityChart";
import TaskStatusChart from "../components/dashboard/TaskStatusChart";
import QuickActions from "../components/dashboard/QuickActions";
import RecentProjects from "../components/dashboard/RecentProjects";
import RecentActivity from "../components/dashboard/RecentActivity";
import CalendarWidget from "../components/dashboard/CalendarWidget";
import UpcomingDeadlines from "../components/dashboard/UpcomingDeadlines";

import type {
    DashboardStats,
    RecentProject,
    Activity,
    WeeklyProductivity,
    UpcomingDeadline,
} from "../types/dashboard";

const Dashboard = () => {
    const [loading, setLoading] = useState(true);

    const [stats, setStats] = useState<DashboardStats>({
        totalWorkspaces: 0,
        totalProjects: 0,
        totalTasks: 0,
        completedTasks: 0,
        inProgressTasks: 0,
        todoTasks: 0,
        overdueTasks: 0,
    });

    const [recentProjects, setRecentProjects] =
        useState<RecentProject[]>([]);

    const [activity, setActivity] =
        useState<Activity[]>([]);

    const [weeklyProductivity, setWeeklyProductivity] =
        useState<WeeklyProductivity[]>([]);

    const [upcomingDeadlines, setUpcomingDeadlines] =
        useState<UpcomingDeadline[]>([]);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const res = await api.get("/dashboard");

                setStats(res.data.stats);

                setRecentProjects(res.data.recentProjects);

                setActivity(res.data.activity);

                setWeeklyProductivity(
                    res.data.weeklyProductivity
                );

                setUpcomingDeadlines(
                    res.data.upcomingDeadlines
                );
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
    }, []);

    return (
        <MainLayout>
            <div className="space-y-8">

                <DashboardHeader />

                {/* Stats */}

                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

                    {loading ? (
                        Array.from({ length: 4 }).map((_, index) => (
                            <StatCardSkeleton key={index} />
                        ))
                    ) : (
                        <>
                            <StatCard
                                title="Workspaces"
                                value={stats.totalWorkspaces}
                                icon={FolderKanban}
                            />

                            <StatCard
                                title="Projects"
                                value={stats.totalProjects}
                                icon={FolderOpen}
                            />

                            <StatCard
                                title="Tasks"
                                value={stats.totalTasks}
                                icon={ListTodo}
                            />

                            <StatCard
                                title="Completed"
                                value={stats.completedTasks}
                                icon={CheckCircle2}
                            />
                        </>
                    )}

                </div>

                {/* Charts */}

                <div className="grid gap-6 xl:grid-cols-2">

                    <ProductivityChart
                        data={weeklyProductivity}
                    />

                    <TaskStatusChart
                        todo={stats.todoTasks}
                        progress={stats.inProgressTasks}
                        done={stats.completedTasks}
                        overdue={stats.overdueTasks}
                    />

                </div>

                {/* Projects & Quick Actions */}

                <div className="grid gap-6 xl:grid-cols-2">

                    <RecentProjects
                        projects={recentProjects}
                    />

                    <QuickActions />

                </div>

                {/* Calendar & Deadlines */}

                <div className="grid gap-6 xl:grid-cols-2">

                    <CalendarWidget />

                    <UpcomingDeadlines
                        deadlines={upcomingDeadlines}
                    />

                </div>

                {/* Activity */}

                <RecentActivity
                    activity={activity}
                />

                {/* Extra Stats */}

                <div className="grid gap-6 md:grid-cols-3">

                    <StatCard
                        title="In Progress"
                        value={stats.inProgressTasks}
                        icon={CircleDashed}
                    />

                    <StatCard
                        title="Todo"
                        value={stats.todoTasks}
                        icon={ListTodo}
                    />

                    <StatCard
                        title="Overdue"
                        value={stats.overdueTasks}
                        icon={Clock3}
                    />

                </div>

            </div>
        </MainLayout>
    );
};

export default Dashboard;