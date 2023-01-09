import { useNavigationContainerRef } from "@react-navigation/native";

export const navigationRef = useNavigationContainerRef();

function navigate(name?: string, params?: any) {
	navigationRef?.navigate(name, params);
}

function goBack() {
	navigationRef.goBack()
}

export {
	navigate,
	goBack
}