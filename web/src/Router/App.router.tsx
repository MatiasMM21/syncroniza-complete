import React, { useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../Pages/Login.page";
import RegisterPage from "../Pages/Register.page";
import DashboardPage from "../Pages/Dashboard.page";
import { AppProvider } from "../Context/MainContext";
import { ThemeProvider } from "../Context/ThemeContext/ThemeContext";
import OCsPage from "../Pages/PaymentDocs/OCs.page";
import InvoicesPage from "../Pages/PaymentDocs/Invoices.page";
import NNCCPage from "../Pages/PaymentDocs/NNCC.page";
import ControlSheetPage from "../Pages/ControlSheet/controlSheet.page";
import WorkloadDashboardPage from "../Pages/Workload/WorkloadDashboard.page";
import GeneralReportPage from "../Pages/Report/GeneralReport.page";
import PlanificationDetailPage from "../Pages/Report/PlanificationDetail.page";
import SpendsDashboardPage from "../Pages/PaymentDocs/SpendsDashboard.page";
import WorkloadReportPage from "../Pages/Workload/WorkloadReport.page";
import ControlSheetDashboardPage from "../Pages/ControlSheet/ControlSheetDashboard.page";
import ProgressTrackerPage from "../Pages/ProgressTracker/ProgressTracker.page";
import AvanceObra from "../Pages/ProgressTracker/AvanceObra.component";
import ConfigurationPage from "../Pages/Configuration/Configuration.page";
import ProgressReportPage from "../Pages/Progress/ProgressReport.page";
import ProgressPlanningPage from "../Pages/Progress/ProgressPlanning.page";

// Nuevas páginas implementadas
import ConstraintsPage from "../Pages/LastPlanner/Constraints.page";
import Bim4DViewerPage from "../Pages/BimVisualization/Bim4DViewer.page";
import ReportGeneratorPage from "../Pages/Reports/ReportGenerator.page";
import ProgressAnalyticsPage from "../Pages/Progress/ProgressAnalytics.page";


const ProtectedRoute = (props: any) => {
    const user: string | null = sessionStorage.getItem("user");

    return user ? props.children :
        <Navigate to="/" />;
}

const AppRouter = () => {
    return (
        <ThemeProvider>
            <AppProvider>
                <BrowserRouter>
                    <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/dashboard" element={
                        <ProtectedRoute>
                            <DashboardPage />
                        </ ProtectedRoute>
                    } />
                    <Route path="/dashboard-pagos" element={
                        <ProtectedRoute>
                            <SpendsDashboardPage />
                        </ProtectedRoute>
                    } />
                    <Route path="/ordenes-compra" element={
                        <ProtectedRoute>
                            <OCsPage />
                        </ProtectedRoute>
                    } />
                    <Route path="/facturas" element={
                        <ProtectedRoute>
                            <InvoicesPage />
                        </ProtectedRoute>
                    } />
                    <Route path="/notas-credito" element={
                        <ProtectedRoute>
                            <NNCCPage />
                        </ProtectedRoute>
                    } />
                    <Route path="/hojas-control/dashboard" element={
                        <ProtectedRoute>
                            <ControlSheetDashboardPage />
                        </ProtectedRoute>
                    } />
                    <Route path="/hojas-control/detalle" element={
                        <ProtectedRoute>
                            <ControlSheetPage />
                        </ProtectedRoute>
                    } />
                    <Route path="/mano-obra/dahboard" element={
                        <ProtectedRoute>
                            <WorkloadDashboardPage />
                        </ProtectedRoute>
                    } />
                    <Route path="/mano-obra/reporte" element={
                        <ProtectedRoute>
                            <WorkloadReportPage />
                        </ProtectedRoute>
                    } />
                    <Route path="/informe-gerencial" element={
                        <ProtectedRoute>
                            <GeneralReportPage />
                        </ProtectedRoute>
                    } />
                    <Route path="/planificacion" element={
                        <ProtectedRoute>
                            <PlanificationDetailPage />
                        </ProtectedRoute>
                    } />

                    <Route path="/Dashboard-Avance" element={
                        <ProtectedRoute>
                            <ProgressTrackerPage />
                        </ProtectedRoute>
                    } />

                    <Route path="/avance/Toma-avance" element={
                        <ProtectedRoute>
                            <AvanceObra />
                        </ProtectedRoute>
                    } />

                    <Route path="/configuracion" element={
                        <ProtectedRoute>
                            <ConfigurationPage />
                        </ProtectedRoute>
                    } />

                    <Route path="/avance/informe-gerencia" element={
                        <ProtectedRoute>
                            <ProgressReportPage />
                        </ProtectedRoute>
                    } />

                    <Route path="/avance/planificacion" element={
                        <ProtectedRoute>
                            <ProgressPlanningPage />
                        </ProtectedRoute>
                    } />

                    {/* Nuevas rutas implementadas */}
                    <Route path="/lastplanner/restricciones" element={
                        <ProtectedRoute>
                            <ConstraintsPage />
                        </ProtectedRoute>
                    } />

                    <Route path="/bim/visor-4d" element={
                        <ProtectedRoute>
                            <Bim4DViewerPage />
                        </ProtectedRoute>
                    } />

                    <Route path="/reportes/generador" element={
                        <ProtectedRoute>
                            <ReportGeneratorPage />
                        </ProtectedRoute>
                    } />

                    <Route path="/avance/analiticas" element={
                        <ProtectedRoute>
                            <ProgressAnalyticsPage />
                        </ProtectedRoute>
                    } />

                    </Routes>
                </BrowserRouter>
            </AppProvider>
        </ThemeProvider>
    );
}

export default AppRouter;