import { defineUserConfig } from "vuepress";
import { defaultTheme } from "@vuepress/theme-default";

export default defineUserConfig({
  base: "/",
  lang: "ru-RU",
  title: "Дизайн токены",
  description: "Пример",
  head: [["link", { rel: "icon", href: "/color-wheel.png" }]],
  theme: defaultTheme({
    repo: "Degray84/figma-detoks",
    locales: {
      "/": {
        selectLanguageName: "Russian",
      },
    },
    logo: "/color-wheel.png",
    editLink: false,
    navbar: [
      {
        text: "Foo",
        link: "/foo/",
      },
      {
        text: "Group",
        children: ["/group/foo.md", "/group/bar.md"],
      },
    ],
    sidebar: [
      // SidebarItem
      {
        text: "Foo",
        link: "/foo/",
        // collapsible: true,
        children: [
          {
            text: "github",
            link: "https://github.com",
            children: [],
          },
        ],
      },
    ],
    lastUpdatedText: "Последнее обновление",
    contributors: false,
    backToHome: "Вернуться домой",
    toggleColorMode: "Переключить тему",
    toggleSidebar: "Переключить боковое меню"
  }),
});
