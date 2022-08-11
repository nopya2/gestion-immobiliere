<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\CycleRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use App\Filter\SimpleSearchFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;

#[ORM\Entity(repositoryClass: CycleRepository::class)]
#[ApiResource(
    normalizationContext: ["groups" => ["read:cycle"]],
    denormalizationContext: ["groups" => ["write:cycle"]],
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
class Cycle
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups([
        "read:cycle"
    ])]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups([
        "read:cycle", "write:cycle"
    ])]
    private $name;

    #[ORM\Column(type: 'text', nullable: true)]
    #[Groups([
        "read:cycle", "write:cycle"
    ])]
    private $description;

    #[ORM\Column(type: 'datetime_immutable')]
    private $createdAt;

    #[ORM\Column(type: 'datetime_immutable')]
    private $updatedAt;

    #[ORM\ManyToOne(targetEntity: Etablishment::class, inversedBy: 'cycles')]
    #[Groups([
        "read:cycle", "write:cycle"
    ])]
    private $etablishment;

    #[ORM\OneToMany(mappedBy: 'cycle', targetEntity: LevelType::class, orphanRemoval: true)]
    private $levelTypes;

    public function __construct()
    {
        $this->createdAt = new \DateTimeImmutable();
        $this->updatedAt = new \DateTimeImmutable();
        $this->levelTypes = new ArrayCollection();
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

    public function setDescription(?string $description): self
    {
        $this->description = $description;

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

    public function getEtablishment(): ?Etablishment
    {
        return $this->etablishment;
    }

    public function setEtablishment(?Etablishment $etablishment): self
    {
        $this->etablishment = $etablishment;

        return $this;
    }

    /**
     * @return Collection<int, LevelType>
     */
    public function getLevelTypes(): Collection
    {
        return $this->levelTypes;
    }

    public function addLevelType(LevelType $levelType): self
    {
        if (!$this->levelTypes->contains($levelType)) {
            $this->levelTypes[] = $levelType;
            $levelType->setCycle($this);
        }

        return $this;
    }

    public function removeLevelType(LevelType $levelType): self
    {
        if ($this->levelTypes->removeElement($levelType)) {
            // set the owning side to null (unless already changed)
            if ($levelType->getCycle() === $this) {
                $levelType->setCycle(null);
            }
        }

        return $this;
    }
}
