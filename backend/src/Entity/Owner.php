<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\OwnerRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use App\Filter\SimpleSearchFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=OwnerRepository::class)
 * @ApiResource(
 *     normalizationContext={"groups"={"read:owner"}},
 *     denormalizationContext={"groups"={"write:owner"}},
 *     attributes={
 *         "pagination_client_enabled"=true,
 *         "pagination_client_items_per_page"=true
 *     }
 * )
 * @ApiFilter(
 *     SimpleSearchFilter::class,
 *     properties={"numFolder", "name"}
 * )
 * @ApiFilter(
 *     OrderFilter::class,
 *     properties={"numFolder", "name", "firstname"},
 *     arguments={"orderParameterName"="order"}
 * )
 * */
class Owner
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"read:owner"})
     * */
    private $id;

    /**
     * @ORM\Column(type="string", length=255, unique=true)
     * @Groups({
     *   "read:owner"
     * })
     * @Assert\NotBlank()
     * @Assert\Length(min=2, max=50)
     */
    private $numFolder = "A INITIALISER";

    /**
     * @ORM\Column(type="string", length=255)
     *@Groups({
     *   "read:owner", "write:owner",
     *   "read:product"
     * })
     * @Assert\NotBlank
     * @Assert\Length(min=2, max=50)
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({
     *   "read:owner", "write:owner",
     *   "read:product"
     * })
     * @Assert\NotBlank
     * @Assert\Length(min=2, max=50)
     */
    private $firstname;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({
     *   "read:owner", "write:owner",
     *   "read:product"
     * })
     * @Assert\NotBlank
     */
    private $contact;
    
    /**
     * @ORM\Column(type="text")
     * @Groups({
     *   "read:owner", "write:owner",
     *   "read:product"
     * })
     * @Assert\NotBlank
     */
    private $address;

    /**
     * @ORM\Column(type="string", length=255, nullable=true, unique=true)
     * @Groups({
     *   "read:owner", "write:owner",
     *   "read:product"
     * })
     * @Assert\NotBlank()
     * @Assert\Email()
     */
    private $email;

    /**
     * @ORM\Column(type="datetime_immutable")
     * @Groups({
     *   "read:owner",
     *   "read:product"
     * })
     */
    private $createdAt;

    /**
     * @ORM\Column(type="datetime_immutable", nullable=true)
     * @Groups({
     *   "read:owner",
     *   "read:product"
     * })
     */
    private $updatedAt;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, cascade={"persist"})
     * @ORM\JoinColumn(nullable=false)
     * @Groups({
     *   "read:owner", "write:owner",
     *   "read:product"
     * })
     */
    private $user;

    /**
     * @ORM\OneToMany(mappedBy="owner", targetEntity=Product::class)
     */
    private $products;

    public function __construct()
    {
        $this->createdAt = new \DateTimeImmutable();
        $this->products = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNumFolder(): ?string
    {
        return $this->numFolder;
    }

    public function setNumFolder(string $numFolder): self
    {
        $this->numFolder = $numFolder;

        return $this;
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

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(?string $firstname): self
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getContact(): ?string
    {
        return $this->contact;
    }

    public function setContact(string $contact): self
    {
        $this->contact = $contact;

        return $this;
    }

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(string $adress): self
    {
        $this->address = $adress;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(?string $email): self
    {
        $this->email = $email;

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

    public function setUpdatedAt(?\DateTimeImmutable $updatedAt): self
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    /**
     * @return Collection<int, Product>
     */
    public function getProducts(): Collection
    {
        return $this->products;
    }

    public function addProduct(Product $product): self
    {
        if (!$this->products->contains($product)) {
            $this->products[] = $product;
            $product->setOwner($this);
        }

        return $this;
    }

    public function removeProduct(Product $product): self
    {
        if ($this->products->removeElement($product)) {
            // set the owning side to null (unless already changed)
            if ($product->getOwner() === $this) {
                $product->setOwner(null);
            }
        }

        return $this;
    }
}
