<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\ProductRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use App\Filter\SimpleSearchFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use ApiPlatform\Metadata\Post;
use App\Controller\PostProductImageController;

/**
 * @ORM\Entity(repositoryClass=ProductRepository::class)
 * @ApiResource(
 *   normalizationContext={"groups"={"read:product"}},
 *   denormalizationContext={
 *      "groups"={"write:product"}
 *   },
 *   attributes={
 *       "pagination_client_enabled"=true,
 *       "pagination_client_items_per_page"=true
 *   },
 *   collectionOperations={
 *      "get", 
 *      "post",
 *      "image"={
 *          "name"="Add image to product",
 *          "method"="POST",
 *          "path"="/products/{id}/image",
 *          "deserialize"=false,
 *          "controller"=PostProductImageController::class
 *      }
 *   },
 *   itemOperations={"get", "put", "delete", "patch"}
 * )
 * @ApiFilter(
 *   SimpleSearchFilter::class,
 *   properties={"numFolder", "name"}
 * )
 * @ApiFilter(
 *   OrderFilter::class,
 *   properties={"numFolder", "name", "firstname"},
 *   arguments={"orderParameterName"="order"}
 * )
 */

class Product
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({
     *   "read:product"
     * })
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({
     *   "read:product","write:product",
     * })
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({
     *   "read:product","write:product",
     * })
     */
    private $reference;

    /**
     * @ORM\ManyToOne(targetEntity=Owner::class, inversedBy="products")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({
     *   "read:product","write:product",
     * })
     */
    private $owner;

    /**
     * @ORM\ManyToOne(targetEntity=TypeConstruction::class)
     * @ORM\JoinColumn(nullable=false)
     * @Groups({
     *   "read:product","write:product",
     * })
     */
    private $constructionType;

    /**
     * @ORM\ManyToOne(targetEntity=TypeProduit::class)
     * @ORM\JoinColumn(nullable=false)
     * @Groups({
     *   "read:product","write:product",
     * })
     */
    private $productType;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({
     *   "read:product","write:product",
     * })
     */
    private $city;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({
     *   "read:product","write:product",
     * })
     */
    private $neighborhood;

    /**
     * @ORM\Column(type="text")
     * @Groups({
     *   "read:product","write:product",
     * })
     */
    private $observation;

    /**
     * @ORM\Column(type="float")
     * @Groups({
     *   "read:product","write:product",
     * })
     */
    private $commission;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({
     *   "read:product","write:product",
     * })
     */
    private $status = 'free';

    /**
     * @ORM\OneToMany(mappedBy="product", targetEntity=ProductPrice::class, orphanRemoval=true, cascade={"persist", "remove"})
     * @Groups({
     *    "read:product","write:product",
     * })
     */
    private $prices;

    /**
     * @ORM\Column(type="float", nullable=true)
     * @Groups({
     *   "read:product","write:product",
     * })
     */
    private $lon;

    /**
     * @ORM\Column(type="float", nullable=true)
     * @Groups({
     *   "read:product","write:product",
     * })
     */
    private $lat;

    /**
     * @ORM\ManyToMany(targetEntity=Image::class)
     */
    private $images;

    /**
     * @ORM\ManyToMany(targetEntity=OperationType::class, cascade={"persist"})
     * @Groups({
     *   "read:product","write:product",
     * })
     */
    private $operationTypes;

    /**
     * @ORM\ManyToOne(targetEntity=User::class)
     * @ORM\JoinColumn(nullable=false)
     * @Groups({
     *   "read:product","write:product",
     * })
     */
    private $user;

    /**
     * @ORM\Column(type="datetime_immutable")
     * @Groups({
     *   "read:product"
     * })
     */
    private $createdAt;

    /**
     * @ORM\Column(type="datetime_immutable", nullable=true)
     * @Groups({
     *   "read:product"
     * })
     */
    private $updatedAt;

    public function __construct()
    {
        $this->prices = new ArrayCollection();
        $this->images = new ArrayCollection();
        $this->operationTypes = new ArrayCollection();
        $this->createdAt = new \DateTimeImmutable();
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

    public function getReference(): ?string
    {
        return $this->reference;
    }

    public function setReference(string $reference): self
    {
        $this->reference = $reference;

        return $this;
    }

    public function getOwner(): ?Owner
    {
        return $this->owner;
    }

    public function setOwner(?Owner $owner): self
    {
        $this->owner = $owner;

        return $this;
    }

    public function getConstructionType(): ?TypeConstruction
    {
        return $this->constructionType;
    }

    public function setConstructionType(?TypeConstruction $constructionType): self
    {
        $this->constructionType = $constructionType;

        return $this;
    }

    public function getProductType(): ?TypeProduit
    {
        return $this->productType;
    }

    public function setProductType(?TypeProduit $productType): self
    {
        $this->productType = $productType;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(string $city): self
    {
        $this->city = $city;

        return $this;
    }

    public function getNeighborhood(): ?string
    {
        return $this->neighborhood;
    }

    public function setNeighborhood(string $neighborhood): self
    {
        $this->neighborhood = $neighborhood;

        return $this;
    }

    public function getObservation(): ?string
    {
        return $this->observation;
    }

    public function setObservation(string $observation): self
    {
        $this->observation = $observation;

        return $this;
    }

    public function getCommission(): float
    {
        return $this->commission;
    }

    public function setCommission(float $commission)
    {
        $this->commission = $commission;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): self
    {
        $this->status = $status;

        return $this;
    }

    /**
     * @return Collection<int, ProductPrice>
     */
    public function getPrices(): Collection
    {
        return $this->prices;
    }

    public function addPrice(ProductPrice $price): self
    {
        if (!$this->prices->contains($price)) {
            $this->prices[] = $price;
            $price->setProduct($this);
        }

        return $this;
    }

    public function removePrice(ProductPrice $price): self
    {
        if ($this->prices->removeElement($price)) {
            // set the owning side to null (unless already changed)
            if ($price->getProduct() === $this) {
                $price->setProduct(null);
            }
        }

        return $this;
    }

    public function getLon(): ?float
    {
        return $this->lon;
    }

    public function setLon(?float $lon): self
    {
        $this->lon = $lon;

        return $this;
    }

    public function getLat(): ?float
    {
        return $this->lat;
    }

    public function setLat(?float $lat): self
    {
        $this->lat = $lat;

        return $this;
    }

    /**
     * @return Collection<int, Image>
     */
    public function getImages(): Collection
    {
        return $this->images;
    }

    public function addImage(Image $image): self
    {
        if (!$this->images->contains($image)) {
            $this->images[] = $image;
        }

        return $this;
    }

    public function removeImage(Image $image): self
    {
        $this->images->removeElement($image);

        return $this;
    }

    /**
     * @return Collection<int, OperationType>
     */
    public function getOperationTypes(): Collection
    {
        return $this->operationTypes;
    }

    public function addOperationType(OperationType $operationType): self
    {
        if (!$this->operationTypes->contains($operationType)) {
            $this->operationTypes[] = $operationType;
        }

        return $this;
    }

    public function removeOperationType(OperationType $operationType): self
    {
        $this->operationTypes->removeElement($operationType);

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

}
