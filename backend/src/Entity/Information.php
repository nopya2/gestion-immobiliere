<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\InformationRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: InformationRepository::class)]
#[ApiResource(
    normalizationContext: ["groups" => ["read:information"]],
    denormalizationContext: ["groups" => ["write:information"]],
    attributes: [
        "pagination_client_enabled" => true,
        "pagination_client_items_per_page" => true
    ]
)]
class Information
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(["read:information", "write:information"])]
    private $id;

    #[ORM\OneToOne(inversedBy: 'information', targetEntity: Etablishment::class, cascade: ['persist', 'remove'])]
    #[Groups(["read:information", "write:information"])]
    private $etablishment;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(["read:information", "write:information"])]
    private $academicYear;

    #[ORM\Column(type: 'date', nullable: true)]
    #[Groups(["read:information", "write:information"])]
    private $startYear;

    #[ORM\Column(type: 'date', nullable: true)]
    #[Groups(["read:information", "write:information"])]
    private $endYear;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEtablishment(): ?Etablishment
    {
        return $this->etablishment;
    }

    public function setEtablishment(?Etablishment $etablishment): self
    {
        $this->etablishment = $etablishment;

        return $this;
    }

    public function getAcademicYear(): ?string
    {
        return $this->academicYear;
    }

    public function setAcademicYear(?string $academicYear): self
    {
        $this->academicYear = $academicYear;

        return $this;
    }

    public function getStartYear(): ?\DateTimeInterface
    {
        return $this->startYear;
    }

    public function setStartYear(?\DateTimeInterface $startYear): self
    {
        $this->startYear = $startYear;

        return $this;
    }

    public function getEndYear(): ?\DateTimeInterface
    {
        return $this->endYear;
    }

    public function setEndYear(?\DateTimeInterface $endYear): self
    {
        $this->endYear = $endYear;

        return $this;
    }
}
