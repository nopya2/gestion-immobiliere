<?php

namespace App\Config;

enum RoleEnum: string
{
    case ROLE_ADMIN = 'Administrateur';
    case ROLE_DG = 'Directeur Général';
    case ROLE_DAF = 'Directeur des affaires financières';
    case ROLE_RES_ETA = 'Responsable d\'établissement';
    case ROLE_EMPLOYEE = 'Employé';
}