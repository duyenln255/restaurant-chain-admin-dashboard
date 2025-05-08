"use client"

import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import i18next from "../../i18n/config"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu"
import { Button } from "../../components/ui/button"
import { countries } from "../../constants/country"
import type { Country } from "../../constants/country"
import type { Dispatch, SetStateAction } from "react"

interface SelectLanguageProps {
  handleClick: () => void
  showMenu: string
  setShowMenu: Dispatch<SetStateAction<string>>
}

export default function SelectLanguage({
  handleClick,
  showMenu,
  setShowMenu,
}: SelectLanguageProps) {
  const { i18n } = useTranslation()
  const [flat, setFlat] = useState<Country | null>(null)

  const handleChangeFlat = (country: Country) => {
    setShowMenu("")
    i18next.changeLanguage(country.short)
    setFlat(country)
  }

  useEffect(() => {
    const current = countries.find((item) => item.short === i18n.language)
    setFlat(current ?? null)
  }, [i18n.language])

  return (
    <DropdownMenu open={showMenu === "login"} onOpenChange={(open) => setShowMenu(open ? "login" : "")}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" onClick={handleClick} className="p-0 h-8 w-10">
          {flat?.avatar ? (
            <img
              src={flat.avatar}
              alt={flat.name}
              className="h-8 w-10 object-cover rounded-md border  border-neutral-300"
            />
          ) : (
            <div className="h-8 w-10 bg-gray-300 rounded-md animate-pulse" />
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-44 border  border-neutral-300 shadow-lg rounded-md">
      {countries.map((country) => (
          <DropdownMenuItem
            key={country.id}
            onClick={() => handleChangeFlat(country)}
            className="flex gap-2 items-center cursor-pointer"
          >
            <img
              src={country.avatar}
              alt={country.name}
              className="h-6 w-8 object-cover rounded-md border  border-neutral-300"
            />
            <span>{country.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
