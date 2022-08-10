<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\LevelRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use App\Filter\SimpleSearchFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;

#[ORM\Entity(repositoryClass: LevelRepository::class)]
#[ApiResource(
    normalizationContext: ["groups" => ["read:level"]],
    denormalizationContext: ["groups" => ["write:level"]],
    attributes: [
        "pagination_client_enabled" => true,
        "pagination_client_items_per_page" => true
    ]
)]
#[ApiFilter(
    SearchFilter::class,
    properties: ["etablishment" => "exact"]
)]
#[ApiFilter(
    SimpleSearchFilter::class,
    properties: ["name"]
)]
#[ApiFilter(
    OrderFilter::class,
    properties: ["name"],
    arguments: ["orderParameterName" => "order"]
)]
class Level
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups([
        "read:level"
    ])]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups([
        "read:level", "write:level"
    ])]
    private $name;

    #[ORM\Column(type: 'text')]
    #[Groups([
        "read:level", "write:level"
    ])]
    private $description;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups([
        "read:level", "write:level"
    ])]
    private $code;

    #[ORM\ManyToOne(targetEntity: Faculty::class)]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups([
        "read:level", "write:level",
        "faculty:level", "faculty:level"
    ])]
    private $faculty;

    #[ORM\ManyToOne(targetEntity: Etablishment::class)]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups([
        "read:level", "write:level"
    ])]
    private $etablishment;

    #[ORM\ManyToOne(targetEntity: Diploma::class)]
    #[Groups([
        "read:level", "write:level"
    ])]
    private $obtainedDiploma;

    #[ORM\ManyToOne(targetEntity: Diploma::class)]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups([
        "read:level", "write:level"
    ])]
    private $preparedDiploma;

    #[ORM\Column(type: 'datetime_immutable')]
    #[Groups([
        "read:level"
    ])]
    private $createdAt;

    #[ORM\Column(type: 'datetime_immutable')]
    #[Groups([
        "read:level"
    ])]
    private $updatedAt;

    #[ORM\Column(type: 'integer')]
    #[Groups([
        "read:level", "write:level"
    ])]
    private $duration;

    #[ORM\ManyToOne(targetEntity: LevelType::class)]
    #[Groups([
        "read:level", "write:level"
    ])]
    private $levelType;

    public function __construct(){
        $this->createdAt = new \DateTimeImmutable();
        $this->updatedAt = new \DateTimeImmutable();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getCode(): ?string
    {
        return $this->code;
    }

    public function setCode(string $code): self
    {
        $this->code = $code;

        return $this;
    }

    public function getFaculty(): ?Faculty
    {
        return $this->faculty;
    }

    public function setFaculty(?Faculty $faculty): self
    {
        $this->faculty = $faculty;

        return $this;
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

    public function getObtainedDiploma(): ?Diploma
    {
        return $this->obtainedDiploma;
    }

    public function setObtainedDiploma(?Diploma $obtainedDiploma): self
    {
        $this->obtainedDiploma = $obtainedDiploma;

        return $this;
    }

    public function getPreparedDiploma(): ?Diploma
    {
        return $this->preparedDiploma;
    }

    public function setPreparedDiploma(?Diploma $preparedDiploma): self
    {
        $this->preparedDiploma = $preparedDiploma;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeImmutable
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(\DateTimeImmutable $updatedAt): self
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    public function getDuration(): ?int
    {
        return $this->duration;
    }

    public function setDuration(int $duration): self
    {
        $this->duration = $duration;

        return $this;
    }

    public function getLevelType(): ?LevelType
    {
        return $this->levelType;
    }

    public function setLevelType(?LevelType $levelType): self
    {
        $this->levelType = $levelType;

        return $this;
    }
}
