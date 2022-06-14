<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\ManagerRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ManagerRepository::class)]
#[ApiResource(
    normalizationContext: ["groups" => ["read:manager"]],
    denormalizationContext: ["groups" => ["write:manager"]]
)]
class Manager extends User
{
    #[ORM\OneToOne(mappedBy: 'manager', targetEntity: Etablishment::class, cascade: ['persist', 'remove'])]
    private $etablishment;

    public function getEtablishment(): ?Etablishment
    {
        return $this->etablishment;
    }

    public function setEtablishment(?Etablishment $etablishment): self
    {
        // unset the owning side of the relation if necessary
        if ($etablishment === null && $this->etablishment !== null) {
            $this->etablishment->setManager(null);
        }

        // set the owning side of the relation if necessary
        if ($etablishment !== null && $etablishment->getManager() !== $this) {
            $etablishment->setManager($this);
        }

        $this->etablishment = $etablishment;

        return $this;
    }
}
