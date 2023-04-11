<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230410205343 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE product_price DROP FOREIGN KEY FK_6B94598544AC3583');
        $this->addSql('DROP INDEX IDX_6B94598544AC3583 ON product_price');
        $this->addSql('ALTER TABLE product_price CHANGE operation_id operation_type_id INT NOT NULL');
        $this->addSql('ALTER TABLE product_price ADD CONSTRAINT FK_6B945985668D0C5E FOREIGN KEY (operation_type_id) REFERENCES operation_type (id)');
        $this->addSql('CREATE INDEX IDX_6B945985668D0C5E ON product_price (operation_type_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE product_price DROP FOREIGN KEY FK_6B945985668D0C5E');
        $this->addSql('DROP INDEX IDX_6B945985668D0C5E ON product_price');
        $this->addSql('ALTER TABLE product_price CHANGE operation_type_id operation_id INT NOT NULL');
        $this->addSql('ALTER TABLE product_price ADD CONSTRAINT FK_6B94598544AC3583 FOREIGN KEY (operation_id) REFERENCES operation_type (id)');
        $this->addSql('CREATE INDEX IDX_6B94598544AC3583 ON product_price (operation_id)');
    }
}
