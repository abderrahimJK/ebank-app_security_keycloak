import {Injectable} from "@angular/core";

@Injectable({providedIn : 'root'})

export class SecurityService{
  public profile? : KeycloakProfile;
  constructor(public kcService: KeycloakService) {

    this.init();
  }

  init(){

    this.kcService.keycloakEvents$.subscribe({
      nest: (e) =>{
        if (e.type == KeycloakEventType.OnAuthSiccess){
          this.kcService.loadUserProfile().then(profile=> {
            this.profile = profile
          })
        }
      }
    })
  }
  public hasRoleIn(roles: string[]):boolean{
    let userRoles = this.kcService.getUserRoles()
    for (let role in roles){

      if (userRoles.include(role)) return true
    }
    return false
  }
}
