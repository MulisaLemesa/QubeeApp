import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const activeColor = Colors[colorScheme ?? "light"].tint;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: activeColor,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          paddingBottom: Platform.OS === "ios" ? 20 : 10,
          height: 70,
        },
      }}
    >
      {/* 1. HOME */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Mana",
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />

      {/* 2. FOUNDATION: Qubee (Alphabet) */}
      <Tabs.Screen
        name="qubee_section"
        options={{
          title: "Qubee",
          tabBarLabel: "Qubee",
          tabBarIcon: ({ color }) => (
            <IconSymbol
              size={28}
              name="character.book.closed.fill"
              color={color}
            />
          ),
        }}
      />

      {/* 3. LOGIC: Lakkoofsa (Numbers) */}
      <Tabs.Screen
        name="lakkoofsa_section"
        options={{
          title: "Lakkoofsa",
          tabBarLabel: "Lakkoofsa",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="number.square.fill" color={color} />
          ),
        }}
      />

      {/* 4. ENVIRONMENT: Guyyaa (Days) */}
      <Tabs.Screen
        name="guyyaa"
        options={{
          title: "Guyyoota",
          tabBarLabel: "Guyyaa",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="calendar" color={color} />
          ),
        }}
      />

      {/* 5. EXPLORE: Everything Else (Halluu, Qaamolee, Bineensota, etc.) */}
      <Tabs.Screen
        name="explore"
        options={{
          title: "Barachuu",
          tabBarLabel: "Explore",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="safari.fill" color={color} />
          ),
        }}
      />

      {/* --- 🛑 HIDDEN FROM TAB BAR (But still accessible via Link) --- */}
      {/* These appear in your screenshot but make the menu too crowded */}

      <Tabs.Screen name="halluu" options={{ href: null }} />
      <Tabs.Screen name="qaamolee" options={{ href: null }} />
      <Tabs.Screen name="bineensota" options={{ href: null }} />
      <Tabs.Screen name="nyaata" options={{ href: null }} />
      <Tabs.Screen name="beeylada" options={{ href: null }} />
      <Tabs.Screen name="faaruuqm" options={{ href: null }} />
      <Tabs.Screen name="ji'oota_waggaa" options={{ href: null }} />
    </Tabs>
  );
}
