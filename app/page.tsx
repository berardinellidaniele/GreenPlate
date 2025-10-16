"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { useEffect } from "react"
import {
  Leaf,
  Droplets,
  Wind,
  TrendingDown,
  Sparkles,
  ArrowLeft,
  RefreshCw,
  Twitter,
  Facebook,
  Linkedin,
  Heart,
  Trophy,
  Target,
  Flame,
  Star,
  Award,
  TrendingUp,
  Zap,
  Crown,
  Medal,
} from "lucide-react"

interface GreenPlateAnalysisResponse {
  food: string
  impact: {
    co2: number
    water: number
    land: number
  }
  sustainabilityScore: number
  aiRecommendation: {
    alternative: string
    alternativeCo2: number
    message: string
    savings: {
      co2Percentage: number
      waterPercentage: number
      landPercentage: number
    }
  }
  weeklyImpact: {
    co2Monthly: number
    waterMonthly: number
  }
}

interface GamificationData {
  level: number
  currentXP: number
  xpToNextLevel: number
  totalAnalyses: number
  streak: number
  totalCO2Saved: number
  achievements: Achievement[]
  goals: Goal[]
  leaderboardPosition: number
}

interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  unlocked: boolean
  unlockedDate?: string
  rarity: "common" | "rare" | "epic" | "legendary"
}

interface Goal {
  id: string
  title: string
  description: string
  progress: number
  target: number
  reward: string
  icon: string
}

export default function GreenPlatePage() {
  const [foodInput, setFoodInput] = useState("")
  const [showResults, setShowResults] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showGamification, setShowGamification] = useState(false)
  const [analysisData, setAnalysisData] = useState<any | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
  if (errorMessage) {
    const timer = setTimeout(() => setErrorMessage(null), 3000)
    return () => clearTimeout(timer)
  }
}, [errorMessage])

const handleAnalyze = async () => {
  if (!foodInput.trim()) return

  setIsAnalyzing(true)
  setErrorMessage(null)
  setAnalysisData(null)

  try {
    const response = await fetch("https://22dr9frp-5000.euw.devtunnels.ms/api/analizza", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ piatto: foodInput }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || "Errore durante l'analisi.")
    }

    if (data.result?.error) {
      setErrorMessage(data.result.error)
    } else {
      setAnalysisData(data.result)
      setShowResults(true)
      setShowGamification(false)
    }
  } catch (error: any) {
    setErrorMessage(error.message || "Errore di connessione al server.")
  } finally {
    setIsAnalyzing(false)
  }
}


  const suggestedPrompts = [
    "Bistecca di manzo",
    "Pasta al pomodoro",
    "Salmone alla griglia",
    "Insalata di quinoa",
    "Pizza margherita",
    "Burger vegetale",
  ]

  const handleSuggestedPrompt = (prompt: string) => {
    setFoodInput(prompt)
  }

 const resetAnalysis = () => {
  setShowResults(false)
  setAnalysisData(null)
  setFoodInput("")
  setErrorMessage(null)
}


  const gamificationData: GamificationData = {
    level: 12,
    currentXP: 2450,
    xpToNextLevel: 3000,
    totalAnalyses: 87,
    streak: 15,
    totalCO2Saved: 342,
    leaderboardPosition: 234,
    achievements: [
      {
        id: "first_analysis",
        name: "Primo Passo",
        description: "Completa la tua prima analisi",
        icon: "star",
        unlocked: true,
        unlockedDate: "2025-01-05",
        rarity: "common",
      },
      {
        id: "week_streak",
        name: "Settimana Verde",
        description: "Mantieni uno streak di 7 giorni",
        icon: "flame",
        unlocked: true,
        unlockedDate: "2025-01-12",
        rarity: "rare",
      },
      {
        id: "eco_warrior",
        name: "Guerriero Eco",
        description: "Risparmia 100kg di CO₂",
        icon: "trophy",
        unlocked: true,
        unlockedDate: "2025-01-20",
        rarity: "epic",
      },
      {
        id: "plant_based",
        name: "Plant-Based Hero",
        description: "Analizza 50 alternative vegetali",
        icon: "leaf",
        unlocked: true,
        unlockedDate: "2025-01-28",
        rarity: "epic",
      },
      {
        id: "master_analyst",
        name: "Maestro Analista",
        description: "Completa 100 analisi",
        icon: "crown",
        unlocked: false,
        rarity: "legendary",
      },
      {
        id: "carbon_saver",
        name: "Salvatore di Carbonio",
        description: "Risparmia 500kg di CO₂",
        icon: "award",
        unlocked: false,
        rarity: "legendary",
      },
    ],
    goals: [
      {
        id: "daily_analysis",
        title: "Analisi Giornaliera",
        description: "Completa 3 analisi oggi",
        progress: 2,
        target: 3,
        reward: "+50 XP",
        icon: "target",
      },
      {
        id: "weekly_streak",
        title: "Streak Settimanale",
        description: "Mantieni lo streak per 7 giorni",
        progress: 5,
        target: 7,
        reward: "+200 XP + Badge",
        icon: "flame",
      },
      {
        id: "sustainable_choices",
        title: "Scelte Sostenibili",
        description: "Scegli 10 alternative green",
        progress: 7,
        target: 10,
        reward: "+150 XP",
        icon: "leaf",
      },
    ],
  }

  const getRarityColor = (rarity: Achievement["rarity"]) => {
    switch (rarity) {
      case "common":
        return "from-muted to-muted-foreground/20"
      case "rare":
        return "from-accent to-accent/70"
      case "epic":
        return "from-secondary to-secondary/70"
      case "legendary":
        return "from-primary via-accent to-secondary"
    }
  }

  const getRarityBorder = (rarity: Achievement["rarity"]) => {
    switch (rarity) {
      case "common":
        return "border-muted-foreground/30"
      case "rare":
        return "border-accent/50"
      case "epic":
        return "border-secondary/50"
      case "legendary":
        return "border-primary/70 shadow-2xl shadow-primary/20"
    }
  }

  const getAchievementIcon = (icon: string) => {
    switch (icon) {
      case "star":
        return <Star className="w-8 h-8" />
      case "flame":
        return <Flame className="w-8 h-8" />
      case "trophy":
        return <Trophy className="w-8 h-8" />
      case "leaf":
        return <Leaf className="w-8 h-8" />
      case "crown":
        return <Crown className="w-8 h-8" />
      case "award":
        return <Award className="w-8 h-8" />
      default:
        return <Medal className="w-8 h-8" />
    }
  }

  const getGoalIcon = (icon: string) => {
    switch (icon) {
      case "target":
        return <Target className="w-6 h-6" />
      case "flame":
        return <Flame className="w-6 h-6" />
      case "leaf":
        return <Leaf className="w-6 h-6" />
      default:
        return <Zap className="w-6 h-6" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 overflow-hidden">
              <Leaf className="w-7 h-7 text-primary-foreground group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              GreenPlate
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant={showGamification ? "default" : "outline"}
              onClick={() => {
                setShowGamification(!showGamification)
                setShowResults(false)
              }}
              className="gap-2 hover:scale-105 transition-all duration-300"
            >
              <Trophy className="w-5 h-5" />
              <span className="hidden md:inline">Progressi</span>
            </Button>
            <p className="text-sm text-muted-foreground hidden lg:block font-medium">
              AI per scelte alimentari sostenibili
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 md:py-20">
        {showGamification ? (
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="text-center space-y-6 animate-slide-up">
              <Button
                variant="ghost"
                onClick={() => setShowGamification(false)}
                className="mb-4 hover:bg-primary/10 hover:scale-110 transition-all duration-300 text-base font-medium"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Torna all'analisi
              </Button>
              <h2 className="text-4xl md:text-6xl font-bold text-balance bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
                I Tuoi Progressi
              </h2>
              <p className="text-xl text-muted-foreground">
                Continua così! Ogni scelta sostenibile ti avvicina al prossimo livello
              </p>
            </div>

            {/* Level & Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              {/* Level Card */}
              <Card className="border-2 border-primary/30 bg-gradient-to-br from-card via-primary/5 to-accent/10 shadow-2xl hover:shadow-primary/20 hover:scale-105 transition-all duration-300">
                <CardContent className="p-8 space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground font-medium mb-1">Il Tuo Livello</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                          {gamificationData.level}
                        </span>
                        <span className="text-2xl text-muted-foreground">/ ∞</span>
                      </div>
                    </div>
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-xl animate-pulse-glow">
                      <Crown className="w-12 h-12 text-primary-foreground" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground font-medium">Esperienza</span>
                      <span className="font-bold text-foreground">
                        {gamificationData.currentXP} / {gamificationData.xpToNextLevel} XP
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-4 overflow-hidden shadow-inner">
                      <div
                        className="bg-gradient-to-r from-primary via-accent to-secondary h-4 rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                        style={{ width: `${(gamificationData.currentXP / gamificationData.xpToNextLevel) * 100}%` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground text-center">
                      {gamificationData.xpToNextLevel - gamificationData.currentXP} XP al prossimo livello
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Stats Card */}
              <Card className="border-2 border-accent/30 bg-gradient-to-br from-card to-accent/10 shadow-2xl hover:shadow-accent/20 hover:scale-105 transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-accent/70 flex items-center justify-center shadow-lg">
                      <TrendingUp className="w-7 h-7 text-accent-foreground" />
                    </div>
                    <h3 className="text-2xl font-bold text-card-foreground">Statistiche</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-transparent">
                      <p className="text-3xl font-bold text-primary">{gamificationData.totalAnalyses}</p>
                      <p className="text-sm text-muted-foreground font-medium mt-1">Analisi Totali</p>
                    </div>
                    <div className="p-4 rounded-xl bg-gradient-to-br from-secondary/10 to-transparent">
                      <div className="flex items-center gap-2">
                        <Flame className="w-6 h-6 text-secondary" />
                        <p className="text-3xl font-bold text-secondary">{gamificationData.streak}</p>
                      </div>
                      <p className="text-sm text-muted-foreground font-medium mt-1">Giorni di Streak</p>
                    </div>
                    <div className="p-4 rounded-xl bg-gradient-to-br from-accent/10 to-transparent col-span-2">
                      <p className="text-4xl font-bold text-accent">{gamificationData.totalCO2Saved} kg</p>
                      <p className="text-sm text-muted-foreground font-medium mt-1">CO₂ Risparmiata Totale</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Goals Section */}
            <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg">
                  <Target className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-3xl font-bold text-foreground">Obiettivi Attivi</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {gamificationData.goals.map((goal, index) => (
                  <Card
                    key={goal.id}
                    className="border-2 border-border bg-gradient-to-br from-card to-primary/5 hover:border-primary/50 hover:shadow-xl hover:scale-105 transition-all duration-300"
                  >
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                          {getGoalIcon(goal.icon)}
                        </div>
                        <span className="px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-bold">
                          {goal.reward}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg text-card-foreground mb-1">{goal.title}</h4>
                        <p className="text-sm text-muted-foreground">{goal.description}</p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground font-medium">Progresso</span>
                          <span className="font-bold text-primary">
                            {goal.progress} / {goal.target}
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-primary to-accent h-3 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${(goal.progress / goal.target) * 100}%` }}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Achievements Section */}
            <div className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-secondary/70 flex items-center justify-center shadow-lg">
                  <Trophy className="w-7 h-7 text-secondary-foreground" />
                </div>
                <h3 className="text-3xl font-bold text-foreground">Trofei & Achievements</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {gamificationData.achievements.map((achievement) => (
                  <Card
                    key={achievement.id}
                    className={`border-2 ${getRarityBorder(achievement.rarity)} ${
                      achievement.unlocked
                        ? "bg-gradient-to-br from-card to-primary/10 hover:scale-110"
                        : "bg-muted/50 opacity-50"
                    } hover:shadow-xl transition-all duration-300 group relative overflow-hidden`}
                  >
                    <CardContent className="p-6 space-y-3">
                      {achievement.unlocked && (
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${getRarityColor(
                            achievement.rarity,
                          )} opacity-10`}
                        />
                      )}
                      <div
                        className={`w-16 h-16 rounded-xl bg-gradient-to-br ${getRarityColor(
                          achievement.rarity,
                        )} flex items-center justify-center mx-auto shadow-lg ${
                          achievement.unlocked ? "group-hover:scale-110 group-hover:rotate-12" : "grayscale"
                        } transition-all duration-300 relative z-10`}
                      >
                        {getAchievementIcon(achievement.icon)}
                      </div>
                      <div className="text-center relative z-10">
                        <h4 className="font-bold text-sm text-card-foreground mb-1">{achievement.name}</h4>
                        <p className="text-xs text-muted-foreground line-clamp-2">{achievement.description}</p>
                        {achievement.unlocked && achievement.unlockedDate && (
                          <p className="text-xs text-primary font-medium mt-2">
                            {new Date(achievement.unlockedDate).toLocaleDateString("it-IT")}
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Leaderboard Teaser */}
            <Card
              className="border-2 border-border bg-gradient-to-br from-card via-secondary/5 to-accent/5 shadow-xl animate-slide-up"
              style={{ animationDelay: "0.4s" }}
            >
              <CardContent className="p-10 text-center space-y-6">
                <div className="flex items-center justify-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center shadow-xl">
                    <Medal className="w-10 h-10 text-secondary-foreground" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-muted-foreground font-medium">La Tua Posizione</p>
                    <p className="text-5xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                      #{gamificationData.leaderboardPosition}
                    </p>
                  </div>
                </div>
                <p className="text-lg text-muted-foreground">
                  Continua ad analizzare e scegliere alternative sostenibili per scalare la classifica!
                </p>
                <Button
                  size="lg"
                  className="gap-2 h-14 px-8 text-lg bg-gradient-to-r from-secondary to-accent hover:from-secondary/90 hover:to-accent/90 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  <Trophy className="w-5 h-5" />
                  Vedi Classifica Completa
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : !showResults ? (
          /* Hero Section - Input */
          <div className="max-w-3xl mx-auto text-center space-y-10">
            <div className="space-y-6 animate-slide-up">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-accent/20 to-primary/20 text-foreground text-sm font-semibold border-2 border-accent/30 shadow-lg animate-pulse-glow">
                <Sparkles className="w-5 h-5 text-accent" />
                Powered by AI
              </div>
              <h2 className="text-5xl md:text-7xl font-bold text-balance leading-tight bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent animate-scale-in">
                Cosa vuoi mangiare oggi?
              </h2>
              <p className="text-xl md:text-2xl text-muted-foreground text-balance max-w-2xl mx-auto leading-relaxed">
                Scopri l'impatto ambientale delle tue scelte alimentari e ricevi consigli per un futuro più sostenibile
              </p>
            </div>

            <div
              className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto animate-slide-up"
              style={{ animationDelay: "0.1s" }}
            >

         {errorMessage && (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in pointer-events-none">
    <div className="bg-destructive text-destructive-foreground border border-destructive px-8 py-6 rounded-2xl shadow-2xl text-center font-medium text-lg animate-scale-in pointer-events-auto">
      ⚠️ {errorMessage}
    </div>
  </div>
)}




              <Input
                type="text"
                placeholder="Es: Bistecca di manzo, Pasta al pomodoro..."
                value={foodInput}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFoodInput(e.target.value)}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && handleAnalyze()}
                className="flex-1 h-16 text-lg px-6 bg-card border-2 border-border hover:border-primary/50 focus:border-primary transition-all duration-300 shadow-lg"
              />
              <Button
                onClick={handleAnalyze}
                disabled={!foodInput.trim() || isAnalyzing}
                size="lg"
                className="h-16 px-10 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-6 h-6 mr-2 animate-spin" />
                    Analisi...
                  </>
                ) : (
                  <>
                    <Leaf className="w-6 h-6 mr-2" />
                    Analizza
                  </>
                )}
              </Button>
            </div>

            <div className="animate-slide-up" style={{ animationDelay: "0.15s" }}>
              <p className="text-sm text-muted-foreground mb-3 font-medium">Oppure prova con:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {suggestedPrompts.map((prompt, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleSuggestedPrompt(prompt)}
                    className="rounded-full border-2 hover:border-primary hover:bg-primary/10 hover:scale-105 transition-all duration-300 text-sm px-4 py-2 hover:text-foreground"
                  >
                    {prompt}
                  </Button>
                ))}
              </div>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
              <Card
                className="border-2 border-primary/20 bg-gradient-to-br from-card to-primary/5 backdrop-blur hover:border-primary/50 hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-slide-up"
                style={{ animationDelay: "0.2s" }}
              >
                <CardContent className="p-8 text-center space-y-3">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mx-auto shadow-lg">
                    <TrendingDown className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg text-card-foreground">Impatto CO₂</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">Calcola le emissioni di carbonio</p>
                </CardContent>
              </Card>
              <Card
                className="border-2 border-accent/20 bg-gradient-to-br from-card to-accent/5 backdrop-blur hover:border-accent/50 hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-slide-up"
                style={{ animationDelay: "0.3s" }}
              >
                <CardContent className="p-8 text-center space-y-3">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center mx-auto shadow-lg">
                    <Droplets className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="font-bold text-lg text-card-foreground">Consumo Idrico</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">Misura l'acqua utilizzata</p>
                </CardContent>
              </Card>
              <Card
                className="border-2 border-secondary/20 bg-gradient-to-br from-card to-secondary/5 backdrop-blur hover:border-secondary/50 hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-slide-up"
                style={{ animationDelay: "0.4s" }}
              >
                <CardContent className="p-8 text-center space-y-3">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary/20 to-secondary/10 flex items-center justify-center mx-auto shadow-lg">
                    <Wind className="w-8 h-8 text-secondary" />
                  </div>
                  <h3 className="font-bold text-lg text-card-foreground">Consigli AI</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">Alternative più sostenibili</p>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          /* Results Section */
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="text-center space-y-6 animate-slide-up">
              <Button
                variant="ghost"
                onClick={resetAnalysis}
                className="mb-4 hover:bg-primary/10 hover:scale-110 transition-all duration-300 text-base font-medium"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Nuova analisi
              </Button>
              <h2 className="text-4xl md:text-6xl font-bold text-balance bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                Analisi completata!
              </h2>
              <p className="text-xl text-muted-foreground">
                Ecco l'impatto ambientale di: <span className="font-bold text-primary">{analysisData?.piatto}</span>
              </p>
            </div>

            {/* Impact Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <Card className="border-2 border-primary/30 bg-gradient-to-br from-card to-primary/10 hover:shadow-2xl hover:scale-105 transition-all duration-300">
                <CardContent className="p-8 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg">
                      <TrendingDown className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <span className="text-4xl font-bold text-primary">{analysisData?.co2_kg}</span>
                  </div>
                  <div>
                    <p className="text-base font-semibold text-card-foreground">Emissioni CO₂</p>
                    <p className="text-sm text-muted-foreground">kg per porzione</p>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-primary to-primary/70 h-3 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: "85%" }}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-accent/30 bg-gradient-to-br from-card to-accent/10 hover:shadow-2xl hover:scale-105 transition-all duration-300">
                <CardContent className="p-8 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent to-accent/70 flex items-center justify-center shadow-lg">
                      <Droplets className="w-8 h-8 text-accent-foreground" />
                    </div>
                    <span className="text-4xl font-bold text-accent">{analysisData?.acqua_l.toLocaleString()}</span>
                  </div>
                  <div>
                    <p className="text-base font-semibold text-card-foreground">Acqua Utilizzata</p>
                    <p className="text-sm text-muted-foreground">litri per porzione</p>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-accent to-accent/70 h-3 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: "92%" }}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-secondary/30 bg-gradient-to-br from-card to-secondary/10 hover:shadow-2xl hover:scale-105 transition-all duration-300">
                <CardContent className="p-8 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-secondary to-secondary/70 flex items-center justify-center shadow-lg">
                      <Leaf className="w-8 h-8 text-secondary-foreground" />
                    </div>
                    <span className="text-4xl font-bold text-secondary">{analysisData?.uso_suolo_m2}</span>
                  </div>
                  <div>
                    <p className="text-base font-semibold text-card-foreground">Uso del Suolo</p>
                    <p className="text-sm text-muted-foreground">m² per porzione</p>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-secondary to-secondary/70 h-3 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: "88%" }}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sustainability Score */}
            <Card
              className="border-2 border-border bg-gradient-to-br from-card to-primary/5 shadow-xl animate-slide-up"
              style={{ animationDelay: "0.2s" }}
            >
              <CardContent className="p-10">
                <div className="flex flex-col md:flex-row items-center gap-10">
                  <div className="flex-shrink-0">
                    <div className="relative w-40 h-40">
                      <svg className="w-40 h-40 transform -rotate-90">
                        <circle
                          cx="80"
                          cy="80"
                          r="70"
                          stroke="currentColor"
                          strokeWidth="14"
                          fill="none"
                          className="text-muted"
                        />
                        <circle
                          cx="80"
                          cy="80"
                          r="70"
                          stroke="url(#gradient)"
                          strokeWidth="14"
                          fill="none"
                          strokeDasharray={`${2 * Math.PI * 70}`}
                          strokeDashoffset={`${2 * Math.PI * 70 * (1 - analysisData?.punteggio_sostenibilita / 100)}`}
                          strokeLinecap="round"
                          className="transition-all duration-1000 ease-out"
                        />
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="oklch(0.58 0.2 145)" />
                            <stop offset="100%" stopColor="oklch(0.68 0.22 170)" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                          {analysisData?.punteggio_sostenibilita}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 space-y-4 text-center md:text-left">
                    <h3 className="text-3xl font-bold text-card-foreground">Punteggio Sostenibilità</h3>
                    <p className="text-muted-foreground leading-relaxed text-lg">
  {analysisData?.spiegazione ||
    "Analisi non disponibile. Riprova con un altro piatto per scoprire il suo impatto ambientale."}
</p>

                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Recommendation */}
            <Card
              className="border-2 border-accent/40 bg-gradient-to-br from-accent/10 via-card to-primary/10 shadow-2xl animate-slide-up animate-pulse-glow"
              style={{ animationDelay: "0.3s" }}
            >
              <CardContent className="p-10 space-y-6">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-primary flex items-center justify-center flex-shrink-0 shadow-xl">
                    <Sparkles className="w-9 h-9 text-accent-foreground animate-pulse" />
                  </div>
                  <div className="flex-1 space-y-5">
                    <div>
                      <h3 className="text-2xl font-bold text-card-foreground mb-3">Consiglio AI per te</h3>
                      <p className="text-muted-foreground leading-relaxed text-lg">
                        Prova con{" "}
                        <span className="font-bold text-accent text-xl">{analysisData?.alternativa_sostenibile}</span>:{" "}
                        {analysisData?.spiegazione} (
                        <span className="font-bold text-primary">
                          {analysisData?.alternative_impatto?.co2_kg} kg CO₂
                        </span>
                        )
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-6 pt-6 border-t-2 border-border">
                      <div className="text-center p-4 rounded-xl bg-gradient-to-br from-primary/10 to-transparent hover:scale-110 transition-transform duration-300">
                        <p className="text-3xl font-bold text-primary">
                          -{analysisData?.risparmio_percentuale?.co2}%
                        </p>
                        <p className="text-sm text-muted-foreground font-medium mt-1">CO₂</p>
                      </div>
                      <div className="text-center p-4 rounded-xl bg-gradient-to-br from-accent/10 to-transparent hover:scale-110 transition-transform duration-300">
                        <p className="text-3xl font-bold text-accent">
                          -{analysisData?.risparmio_percentuale?.acqua}%
                        </p>
                        <p className="text-sm text-muted-foreground font-medium mt-1">Acqua</p>
                      </div>
                      <div className="text-center p-4 rounded-xl bg-gradient-to-br from-secondary/10 to-transparent hover:scale-110 transition-transform duration-300">
                        <p className="text-3xl font-bold text-secondary">
                          -{analysisData?.risparmio_percentuale?.suolo}%
                        </p>
                        <p className="text-sm text-muted-foreground font-medium mt-1">Suolo</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Weekly Impact */}
            <Card
              className="border-2 border-border bg-gradient-to-br from-card to-secondary/5 shadow-xl animate-slide-up"
              style={{ animationDelay: "0.4s" }}
            >
              <CardContent className="p-10 text-center space-y-6">
                <h3 className="text-2xl font-bold text-card-foreground">Risparmio Settimanale Stimato</h3>
                <p className="text-muted-foreground text-lg">
                  Se sostituissi questo alimento 3 volte a settimana, risparmieresti:
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-10 pt-6">
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent hover:scale-110 transition-transform duration-300">
                    <p className="text-5xl font-bold text-primary">{analysisData?.impatto_settimanale?.co2_mensile_kg} kg</p>
                    <p className="text-base text-muted-foreground font-medium mt-2">CO₂ al mese</p>
                  </div>
                  <div className="hidden sm:block w-px h-20 bg-border" />
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-accent/10 to-transparent hover:scale-110 transition-transform duration-300">
                    <p className="text-5xl font-bold text-accent">
                      {analysisData?.impatto_settimanale?.acqua_mensile_l.toLocaleString()} L
                    </p>
                    <p className="text-base text-muted-foreground font-medium mt-2">Acqua al mese</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="text-center space-y-6 pt-10 animate-slide-up" style={{ animationDelay: "0.5s" }}>
              <p className="text-2xl font-semibold text-foreground">Vuoi condividere la tua scelta green?</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="flex gap-3">
                  <Button
                    size="lg"
                    className="h-14 w-14 p-0 rounded-full bg-gradient-to-br from-[#1DA1F2] to-[#0d8bd9] hover:scale-110 hover:shadow-2xl transition-all duration-300"
                    title="Condividi su Twitter"
                  >
                    <Twitter className="w-6 h-6 text-white" />
                  </Button>
                  <Button
                    size="lg"
                    className="h-14 w-14 p-0 rounded-full bg-gradient-to-br from-[#1877F2] to-[#0d5dbf] hover:scale-110 hover:shadow-2xl transition-all duration-300"
                    title="Condividi su Facebook"
                  >
                    <Facebook className="w-6 h-6 text-white" />
                  </Button>
                  <Button
                    size="lg"
                    className="h-14 w-14 p-0 rounded-full bg-gradient-to-br from-[#0A66C2] to-[#084d91] hover:scale-110 hover:shadow-2xl transition-all duration-300"
                    title="Condividi su LinkedIn"
                  >
                    <Linkedin className="w-6 h-6 text-white" />
                  </Button>
                </div>
                <div className="hidden sm:block w-px h-12 bg-border" />
                <Button
                  size="lg"
                  onClick={resetAnalysis}
                  className="gap-2 h-14 px-8 text-lg bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  <Leaf className="w-5 h-5" />
                  Analizza altro cibo
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-border/50 mt-20 bg-gradient-to-t from-primary/5 via-accent/5 to-transparent backdrop-blur-sm">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Brand Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 justify-center group">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <Leaf className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  GreenPlate
                </h3>
              </div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Ogni scelta alimentare è un passo verso un futuro più sostenibile. Insieme possiamo fare la differenza.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
              <div className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent hover:from-primary/10 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <p className="font-semibold text-foreground">AI-Powered</p>
                <p className="text-sm text-muted-foreground text-center">
                  Analisi intelligente dell'impatto ambientale
                </p>
              </div>
              <div className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-gradient-to-br from-accent/5 to-transparent hover:from-accent/10 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-accent" />
                </div>
                <p className="font-semibold text-foreground">Sostenibile</p>
                <p className="text-sm text-muted-foreground text-center">Focus su criteri ESG e benessere</p>
              </div>
              <div className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-gradient-to-br from-secondary/5 to-transparent hover:from-secondary/10 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary/20 to-secondary/10 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-secondary" />
                </div>
                <p className="font-semibold text-foreground">Consapevole</p>
                <p className="text-sm text-muted-foreground text-center">Scelte informate per il pianeta</p>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="pt-8 border-t border-border/30 space-y-3">
              <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
                Made with <Heart className="w-4 h-4 text-secondary animate-pulse" /> for a sustainable future
              </p>
              <p className="text-xs text-muted-foreground/70">
                © 2025 GreenPlate. Innovazione per il benessere e l'ambiente.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
