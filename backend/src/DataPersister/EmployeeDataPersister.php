<?php

namespace App\DataPersister;

use ApiPlatform\Core\DataPersister\ContextAwareDataPersisterInterface;
use App\Entity\Employee;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\HttpFoundation\RequestStack;

final class EmployeeDataPersister implements ContextAwareDataPersisterInterface
{
    private $em;
    private $userPasswordEncoder;
    private $_request;

    public function __construct(
        EntityManagerInterface $em,
        UserPasswordHasherInterface $userPasswordEncoder,
        RequestStack $request)
    {
        $this->em = $em;
        $this->userPasswordEncoder = $userPasswordEncoder;
        $this->_request = $request->getCurrentRequest();
    }

    public function supports($data, array $context = []): bool
    {
        return $data instanceof Employee;
    }

    /**
     * @param Employee $data
     */
    public function persist($data, array $context = [])
    {
        if(isset($this->_request->toArray()['password'])){
            if ($data->getPassword()) {
                $data->setPassword(
                    $this->userPasswordEncoder->hashPassword($data, $data->getPassword())
                );
                $data->eraseCredentials();
            }
        }else{
            $data->setPassword($data->getPassword());
        }
        

        // call your persistence layer to save $data
        $this->em->persist($data);
        $this->em->flush();
        return $data;
    }

    public function remove($data, array $context = [])
    {
        // call your persistence layer to delete $data
        $this->em->remove($data);
        $this->em->flush();
    }
}