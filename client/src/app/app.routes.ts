import { Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ClientLayoutComponent } from './layouts/client-layout/client-layout.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AdminComponent } from './layouts/admin/admin.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { CreateComponent } from './pages/admin/products/create/create.component';

export const routes: Routes = [
  {path:'admin', component: AdminComponent,canActivate: [AuthGuard],children:[
    { path: '', component: DashboardComponent },
    { path: 'products/create', component: CreateComponent},
  ]},
  {
    path: '',
    component: ClientLayoutComponent,
    children: [
      { path: '', component: HomepageComponent },
      { path: 'product/:id', component: ProductDetailComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
      { path: '**', component: NotFoundComponent },
    ],
  },
  
];
