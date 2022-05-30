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

use App\Repository\UserRepository;

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

    #[Route('/api/login', name: 'security_login')]
    public function login(
        Request $request, 
        AuthenticationUtils $helper,
        UserRepository $userRepository,
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

        $token = $JWTManager->create($user);

        return $this->json([
            'token' => $token,
            'user' => $user
        ], 200);
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
}
