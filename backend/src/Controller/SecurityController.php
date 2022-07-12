<?php

/*
 * This file is part of the Symfony package.
 *
 * (c) Fabien Potencier <fabien@symfony.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Symfony\Component\Security\Http\Util\TargetPathTrait;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

use App\Repository\UserRepository;
use App\Repository\ManagerRepository;
use App\Repository\EmployeeRepository;
use App\Config\RoleEnum;

/**
 * Controller used to manage the application security.
 * See https://symfony.com/doc/current/security/form_login_setup.html.
 *
 * @author Ryan Weaver <weaverryan@gmail.com>
 * @author Javier Eguiluz <javier.eguiluz@gmail.com>
 */
class SecurityController extends AbstractController
{
    use TargetPathTrait;
    /**
     * Authentification des administrateurs de la plateforme
     */
    #[Route('/api/login', name: 'security_login')]
    public function login(
        Request $request, 
        AuthenticationUtils $helper,
        UserRepository $userRepository,
        ManagerRepository $managerRepository,
        UserPasswordHasherInterface $userPasswordEncoder,
        JWTTokenManagerInterface $JWTManager): Response
    {
        $data = json_decode($request->getContent(), true);
        //On verifie si l'utilisateur avec cette e-mail existe
        $user = $userRepository->findOneBy(['email' => $data['email']]);

        if(empty($user))
            return $this->json(['error' => "Cet utilisateur n'existe pas!"], 400);
        //Ensuite on verifie si les mots de passe correspondent
        $match = $userPasswordEncoder->isPasswordValid($user, $data['password']);
        if(!$match)
            return $this->json(['error' => "Mot de passe invalide!"], 400);
        //On verifi si le comte est active
        if($user->getEnabled() === false)
            return $this->json(['error' => "Compte désactivé!"], 400);

        //On verifie si l'utilisateur est un manager
        //et on renvoie l'objet manage
        if(in_array(RoleEnum::ROLE_RES_ETA->name, $user->getRoles()) === true){
            $manager = $managerRepository->find($user->getId());

            $token = $JWTManager->create($manager);
            $manager->setToken($token);

            return $this->json($manager, 200);
        }

        $token = $JWTManager->create($user);
        $user->setToken($token);

        return $this->json($user, 200);
    }

    /**
     * Authentification des employés
     */
    #[Route('/api/employee/login', name: 'security_employee_login')]
    public function employeeLogin(
        Request $request, 
        AuthenticationUtils $helper,
        EmployeeRepository $userRepository,
        ManagerRepository $managerRepository,
        UserPasswordHasherInterface $userPasswordEncoder,
        JWTTokenManagerInterface $JWTManager,
        NormalizerInterface $normalizer): Response
    {
        $data = json_decode($request->getContent(), true);
        //On verifie si l'utilisateur avec cette e-mail existe
        $user = $userRepository->findOneBy(['email' => $data['email']]);

        if(empty($user))
            return $this->json(['error' => "Cet utilisateur n'existe pas!"], 400);
        //Ensuite on verifie si les mots de passe correspondent
        $match = $userPasswordEncoder->isPasswordValid($user, $data['password']);
        if(!$match)
            return $this->json(['error' => "Mot de passe invalide!"], 400);
        //On verifie si le comte est active
        if($user->getEnabled() === false)
            return $this->json(['error' => "Compte désactivé!"], 400);

        //On verifie si l'utilisateur est un manager
        //et on renvoie l'objet manager
        // if(in_array(RoleEnum::ROLE_RES_ETA->name, $user->getRoles()) === true){
        //     $manager = $managerRepository->find($user->getId());

        //     $token = $JWTManager->create($manager);
        //     $manager->setToken($token);

        //     return $this->json($manager, 200);
        // }

        $token = $JWTManager->create($user);
        $user->setToken($token);

        return $this->json($user, 200);
    }

    /**
     * This is the route the user can use to logout.
     *
     * But, this will never be executed. Symfony will intercept this first
     * and handle the logout automatically. See logout in config/packages/security.yaml
     */
    #[Route('/logout', name: 'security_logout')]
    public function logout(): void
    {
        throw new \Exception('This should never be reached!');
    }

    /**
     * Page de verification sz l'existence du Token
     */
    #[Route('/api/verify', name: 'security_verify')]
    public function verify()
    {
        return $this->json(['message' => 'Authenticated']);
    }
}
