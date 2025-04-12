import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ClientsService } from '../../services/api-client/clients/clients.service';
import { SERVICES_TOKEN } from '../../services/service.token';
import { IClientService } from '../../services/api-client/clients/iclients.service';
import { ClientFormComponent } from '../components/client-form/client-form.component';
import { SnackbarManagerService } from '../../services/snackbar-manager.service';
import { ISnackbarManagerService } from '../../services/isnackbar-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { ClientModelForm } from '../client.models';

@Component({
  selector: 'app-edit-client',
  imports: [ClientFormComponent],
  templateUrl: './edit-client.component.html',
  styleUrl: './edit-client.component.scss',
  providers: [
    { provide: SERVICES_TOKEN.HTTP.CLIENT, useClass: ClientsService },
    { provide: SERVICES_TOKEN.SNACKBAR, useClass: SnackbarManagerService },
  ],
})
export class EditClientComponent implements OnInit, OnDestroy {
  //private httpSubscriptions?: Subscription[] = [];
  public client: ClientModelForm = { id: 0, name: '', email: '', phone: '' };
  private destroy$ = new Subject<void>();

  constructor(
    @Inject(SERVICES_TOKEN.HTTP.CLIENT)
    private readonly httpService: IClientService,
    @Inject(SERVICES_TOKEN.SNACKBAR)
    private readonly snackBarManager: ISnackbarManagerService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (!id) {
      this.snackBarManager.show('Erro ao recuperar informações do cliente');
      this.router.navigate(['clients/list']);
      return;
    }
    this.httpService
      .findById(Number(id))
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => (this.client = data),
        error: () => {
          this.snackBarManager.show('Erro ao buscar cliente');
          this.router.navigate(['clients/list']);
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmitClient(value: ClientModelForm) {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    const { ...request } = value;
    console.log('ID to update:', id, typeof id);
    console.log('Request body:', request);

    if (id) {
      this.httpService
        .update(id, request)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.snackBarManager.show('Usuário atualizado com sucesso');
          this.router.navigate(['clients/list']);
        });
      return;
    }
    this.snackBarManager.show('Um erro inesperado aconteceu');
    this.router.navigate(['clients/list']);
  }
}
