<?php

namespace App\DataPersister;

use ApiPlatform\Core\DataPersister\ContextAwareDataPersisterInterface;
use App\Entity\Customer;
use Doctrine\ORM\EntityManagerInterface;
use App\Service\NumeroGenerator;

final class CustomerDataPersister implements ContextAwareDataPersisterInterface
{
    private $em;
    private $numeroGenerator;

    public function __construct(
        EntityManagerInterface $em,
        NumeroGenerator $numeroGenerator)
    {
        $this->em = $em;
        $this->numeroGenerator = $numeroGenerator;
    }

    public function supports($data, array $context = []): bool
    {
        return $data instanceof Customer;
    }

    /**
     * @param Customer $data
     */
    public function persist($data, array $context = [])
    {
        if(!$data->getId()){
            $data->setNumFolder($this->numeroGenerator->getCustomerNumber());
        }

        if(!$data->getId()){
            $data->setUpdatedAt(new \DateTimeImmutable());
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