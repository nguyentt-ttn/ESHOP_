## Routes

- Component tuong ung: ng g c pages/ten_page
- Them { path: '', component: app.routes : []} //path ko dc bat dau bang / (slash)
- app.component.html: <router-outlet></router-outlet>

## Tach Component: ng g c components/ten_component

- Header
- Imports [ten_component]
- Su dung selector: app-header trong .html

## Tach Layout: Client (header, footer), Admin (Sidebar)

- ng g c layouts/client-layout
- RouterLink - import, thay the a href = a routerLink

## Data binding

- Gắn kết giá trị: {{pageTitle}}
- Gắn kết thuộc tính: <img [src]='product.imageUrl'>

# Show ProductList

- NgFor (import NgFor): \*ngFor="let item of list"
- @for (ko can import): @for (item of list; track item.name) {}

## Server: Json - server : @0.17.4

- npm i -D json-server@0.17.4
- db.json (root: ngang hang package.json)
  {
  "products": []
  }
- package.json: srcript: "server": "json-server db.json",

## HTTP Client + services call API

- app.config.ts: provideHttpClient()
- services: ng g s services/product
- http = inject(HttpClient)
- getAll: http.get("API_URL")
