<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\ImageRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ImageRepository::class)]
#[ApiResource(
    normalizationContext: ["groups" => ["read:image"]],
    denormalizationContext: ["groups" => ["write:image"]],
    attributes: [
        "pagination_client_enabled" => true,
        "pagination_client_items_per_page" => true
    ]
)]
#[ORM\HasLifecycleCallbacks()]
class Image
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups([
        "read:etablishment", "write:etablishment",
        "read:product","write:product",
    ])]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups([
        "read:etablishment", "write:etablishment",
        "read:product","write:product",
    ])]
    private $filename;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups([
        "read:etablishment", "write:etablishment",
        "read:product","write:product",
    ])]
    private $extension;

    #[ORM\Column(type: 'float')]
    #[Groups([
        "read:etablishment", "write:etablishment",
        "read:product","write:product",
    ])]
    private $size;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(["read:etablishment", "write:etablishment",
        "read:product","write:product",
    ])]
    private $url;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFilename(): ?string
    {
        return $this->filename;
    }

    public function setFilename(string $filename): self
    {
        $this->filename = $filename;

        return $this;
    }

    public function getExtension(): ?string
    {
        return $this->extension;
    }

    public function setExtension(string $extension): self
    {
        $this->extension = $extension;

        return $this;
    }

    public function getSize(): ?float
    {
        return $this->size;
    }

    public function setSize(float $size): self
    {
        $this->size = $size;

        return $this;
    }

    public function getUrl(): ?string
    {
        return $this->url;
    }

    public function setUrl(string $url): self
    {
        $this->url = $url;

        return $this;
    }
}
