<?php

namespace App\DataPersister;

use ApiPlatform\Core\DataPersister\ContextAwareDataPersisterInterface;
use App\Entity\TestApp;
use Doctrine\ORM\EntityManagerInterface;

final class TestAppDataPersister implements ContextAwareDataPersisterInterface
{
    private $em;

    public function __construct(
        EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    public function supports($data, array $context = []): bool
    {
        return $data instanceof TestApp;
    }

    /**
     * @param TestApp $data
     */
    public function persist($data, array $context = [])
    {
        dd(0);
        
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