<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220619205743 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE permission ADD CONSTRAINT FK_E04992AAAFC2B591 FOREIGN KEY (module_id) REFERENCES module (id)');
        $this->addSql('CREATE INDEX IDX_E04992AAAFC2B591 ON permission (module_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE permission DROP FOREIGN KEY FK_E04992AAAFC2B591');
        $this->addSql('DROP INDEX IDX_E04992AAAFC2B591 ON permission');
    }
}
