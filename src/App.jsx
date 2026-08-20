import { Navigate, Route, Routes } from 'react-router-dom'
import Phone from './components/Phone'
import NavTracker from './components/NavTracker'

/* 시작 / 인증 */
import StartScreen from './screens/StartScreen'
import SignUpScreen from './screens/SignUpScreen'
import LoginScreen from './screens/LoginScreen'
import LoginErrorScreen from './screens/LoginErrorScreen'
import FindPasswordScreen from './screens/FindPasswordScreen'
import ResetPasswordScreen from './screens/ResetPasswordScreen'
import OnboardingLinkScreen from './screens/OnboardingLinkScreen'

/* 홈 */
import HomeScreen from './screens/HomeScreen'
import HomeEmptyScreen from './screens/HomeEmptyScreen'
import NotificationsScreen from './screens/NotificationsScreen'

/* 명세서 / 시간 흐름 */
import ReceiptScreen from './screens/ReceiptScreen'
import ReceiptDatePickerScreen from './screens/ReceiptDatePickerScreen'
import SourceDetailScreen from './screens/SourceDetailScreen'
import TimeFlow7Screen from './screens/TimeFlow7Screen'
import TimeFlow4WScreen from './screens/TimeFlow4WScreen'

/* 식사 */
import MealScreen from './screens/MealScreen'
import MealAnalysisScreen from './screens/MealAnalysisScreen'
import MealRecordsEmptyScreen from './screens/MealRecordsEmptyScreen'
import MealRecordsScreen from './screens/MealRecordsScreen'

/* 플랜 */
import PlanEditScreen from './screens/PlanEditScreen'
import PlanScreen from './screens/PlanScreen'

/* 미래 얼굴 */
import FutureFaceScreen from './screens/FutureFaceScreen'
import FutureFaceUploadScreen from './screens/FutureFaceUploadScreen'
import FutureFaceLoadingScreen from './screens/FutureFaceLoadingScreen'
import FutureFaceResultScreen from './screens/FutureFaceResultScreen'

/* 보호 모드 */
import ProtectionSuggestScreen from './screens/ProtectionSuggestScreen'

/* 설정 */
import SettingsScreen from './screens/SettingsScreen'
import SettingsNotificationScreen from './screens/SettingsNotificationScreen'
import SettingsProtectionScreen from './screens/SettingsProtectionScreen'
import SettingsDataScreen from './screens/SettingsDataScreen'
import SettingsDataManageScreen from './screens/SettingsDataManageScreen'
import SettingsDataDeleteScreen from './screens/SettingsDataDeleteScreen'
import SettingsDataLinkScreen from './screens/SettingsDataLinkScreen'
import SettingsPrivacyScreen from './screens/SettingsPrivacyScreen'

/* 약관 / 개인정보 */
import TermsScreen from './screens/TermsScreen'
import PrivacyPolicyScreen from './screens/PrivacyPolicyScreen'
import PrivacyPolicyAlertScreen from './screens/PrivacyPolicyAlertScreen'

export default function App() {
  return (
    <Phone>
      <NavTracker />
      <Routes>
        <Route path="/" element={<Navigate to="/start" replace />} />

        <Route path="/start" element={<StartScreen />} />
        <Route path="/signup" element={<SignUpScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/login/error" element={<LoginErrorScreen />} />
        <Route path="/login/find" element={<FindPasswordScreen />} />
        <Route path="/login/reset" element={<ResetPasswordScreen />} />
        <Route path="/onboarding" element={<OnboardingLinkScreen />} />

        <Route path="/home" element={<HomeScreen />} />
        <Route path="/home-empty" element={<HomeEmptyScreen />} />
        <Route path="/notifications" element={<NotificationsScreen />} />

        <Route path="/receipt" element={<ReceiptScreen />} />
        <Route path="/receipt/date" element={<ReceiptDatePickerScreen />} />
        <Route path="/source" element={<SourceDetailScreen />} />
        <Route path="/flow" element={<TimeFlow7Screen />} />
        <Route path="/flow/4w" element={<TimeFlow4WScreen />} />

        <Route path="/meal" element={<MealScreen />} />
        <Route path="/meal/analysis" element={<MealAnalysisScreen />} />
        <Route path="/meal/records" element={<MealRecordsScreen />} />
        <Route path="/meal/records-empty" element={<MealRecordsEmptyScreen />} />

        <Route path="/plan" element={<PlanScreen />} />
        <Route path="/plan/edit" element={<PlanEditScreen />} />

        <Route path="/future" element={<FutureFaceScreen />} />
        <Route path="/future/upload" element={<FutureFaceUploadScreen />} />
        <Route path="/future/loading" element={<FutureFaceLoadingScreen />} />
        <Route path="/future/result" element={<FutureFaceResultScreen />} />

        <Route path="/protection-suggest" element={<ProtectionSuggestScreen />} />

        <Route path="/settings" element={<SettingsScreen />} />
        <Route path="/settings/notification" element={<SettingsNotificationScreen />} />
        <Route path="/settings/protection" element={<SettingsProtectionScreen />} />
        <Route path="/settings/data" element={<SettingsDataScreen />} />
        <Route path="/settings/data/manage" element={<SettingsDataManageScreen />} />
        <Route path="/settings/data/manage/delete" element={<SettingsDataDeleteScreen />} />
        <Route path="/settings/data/link" element={<SettingsDataLinkScreen />} />
        <Route path="/settings/privacy" element={<SettingsPrivacyScreen />} />

        <Route path="/terms" element={<TermsScreen />} />
        <Route path="/privacy" element={<PrivacyPolicyScreen />} />
        <Route path="/privacy/alert" element={<PrivacyPolicyAlertScreen />} />

        <Route path="*" element={<Navigate to="/start" replace />} />
      </Routes>
    </Phone>
  )
}
